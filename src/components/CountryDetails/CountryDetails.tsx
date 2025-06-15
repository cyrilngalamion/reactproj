import { useParams, useNavigate } from "react-router-dom"
import arrowBack from '../../assets/arrow.svg';
import { Borders, type CountryProps } from '../../components';

export default function CountryDetails({countries}: CountryProps){

    const {name} = useParams();
    const nav = useNavigate();
    const country = countries.find((cntry) => cntry.name === name);

    if (!country)
      return (
        <div className="flex items-center justify-center h-96">
          <div className="text-vistBlue font-mono text-3xl text-center font-extrabold">
            <h1>Searching for details, traveller...</h1>
          </div>
        </div>
      );

    return(
        <>
            <div className="mt-4  px-12 py-8">
            <button onClick={() => nav('/')} className="flex items-center py-2 px-6  bg-grNav font-bold font-mono cursor-pointer text-amber-100  rounded-sm shadow-md">
                <img src={arrowBack} alt="back" />
            </button>
                <div className="mt-10 space-y-10 md:space-y-0 gap-6 md:grid grid-cols-2 items-center">
                    <div className="flex items-center justify-center">
                        <img className="w-[26rem] shadow-xl object-contain" src={country?.flag} alt={country.name} />
                    </div>
                    <div className="dark:text-vistBlue">
                        <h1 className="font-bold  text-2xl text-left text-amber-100 font-mono">{country?.name}</h1>
                        <div className="flex flex-col sm:flex-row mt-4 space-y-8 sm:space-y-0 sm:space-x-16 text-left font-bold ">
                            <div>
                                <p>
                                    Capital: 
                                    <span className="text-sm text-amber-100"> {country?.capital}</span>
                                </p>
                                <p>
                                    Region/Subregion: 
                                    <span className="text-sm text-amber-100"> {country?.region}/{country?.subregion}</span>
                                </p>
                                <p>
                                    Population: 
                                    <span className="text-sm text-amber-100"> {country?.population.toLocaleString()}</span>
                                </p>
                                <p>
                                    Area: 
                                    <span className="text-sm text-amber-100"> {country?.area.toLocaleString()} km²</span>
                                </p>
                                
                                <p>
                                    Longitude: <span className="text-sm text-amber-100"> {country?.coordinates.longitude.toFixed(4).toLocaleString()}</span>
                                
                                </p>
                                <p>
                                    Latitude:<span className="text-sm text-amber-100"> {country?.coordinates.latitude.toFixed(4).toLocaleString()}</span>
                                </p>
                                
                            </div>
                            <div>
                                <p>
                                    Timezones: 
                                    <span className="text-sm text-amber-100"> {country?.timezones}</span>
                                </p>
                                <p>
                                    Currencies: 
                                    <span className="text-sm text-amber-100"> {country?.currency}</span>
                                </p>
                                <p>
                                    Languages: 
                                    <span className="text-sm text-amber-100"> {country?.languages.join(', ')}</span>
                                </p>
                            </div>
                        </div>
                        <div className="mt-8 flex items-center flex-wrap font-bold">
                            <Borders borders={country.borders}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

//onClick={() => navigate(`/country/${cntry.name}`)}