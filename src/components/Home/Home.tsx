import { useState } from "react";
import globeLoad from "../../assets/globe.gif";
import Flag from "../Flag/Flag";
import search from '../../assets/search.svg'

export interface CountryDataData{
  latitude: string;
  longitude: string;
}

export interface CountryData {
  name: string;
  capital: string;
  region: string;
  subregion: string;
  population: number;
  currency: string;
  flag: string;
  timezones: string;
  area: number;
  coordinates: CountryDataData[];
  languages: string[];
  borders: string[];
}

export interface CountryProps {
  countries: CountryData[];
  regions: string[];
  loading: boolean;
}

export default function Home({ countries, regions, loading }: CountryProps) {
  const [query, setQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState<string>("");
  

  const country = countries.filter((cntry) => {
    const search = cntry.name.toLowerCase().startsWith(query.toLowerCase());
    const reg = selectedRegion ? cntry.region === selectedRegion : true;
    return search && reg;
  }
  );


  if (loading)
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-vistBlue font-mono text-3xl text-center font-extrabold">
          <img src={globeLoad} alt="Loading" className="mx-auto" />
          <h1>Traveling...</h1>
        </div>
      </div>
    );

  return ( 
    <>
      <div className="px-12 py-6 scroll-smooth">
        <div className="flex items-center flex-col space-y-5 sm:space-y-0 sm:flex-row space-x-4">
          <div className="flex items-center 2xl:w-[28rem] sm:w-96 text-amber-100 shadow-md space-x-2 bg-gray-700 rounded-sm 2xl:px-6 2xl:py-5 px-4 py-3">
            <img src={search}/>
            <input
              className="bg-transparent outline-none font-mono"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search countries..."
            />
          </div>
          <div className="flex items-center bg-gray-700 rounded-sm">
          <select
            value={selectedRegion}
            onChange={(r) => setSelectedRegion(r.target.value)}
            className="font-bold font-mono text-amber-100 border-gray-700 rounded-xs px-4 py-2 shadow-sm focus:outline-none focus:ring-0 focus:border-transparent">

            <option className="font-bold font-mono bg-grBody " value="">All</option>
            {regions.map((region) => (
              <option className="font-bold font-mono bg-grBody text-amber-100" value={region}>
                {region}
              </option>
            ))}
            </select>
            </div>
        </div>

        <div className="grid scroll-smooth sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5 mt-5 gap-10 xl:gap-16">
          {query ? (
              country.map((cntry) => (
                <Flag cntry={cntry}/>
              ))
          ) : selectedRegion ? (
            country.map((cntry) => (
              <Flag cntry={cntry}/>
            ))
        ) : countries.map((cntry) => (
            <Flag cntry={cntry}/>
          ))}
        </div>
      </div>
    </>
  );
}
