import "./App.css";
import { About, Footer, Header, Home, CountryDetails, CountryData} from "./components";
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function App() {
  const [countries, setCountries] = useState<CountryData[]>([]);
  const [regions, setRegions] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const api = "https://countries-api-abhishek.vercel.app/countries";
    axios.get(api).then((res) => {
      const all: CountryData[] = res.data.data;
      const regionList: string[] = [...new Set(all.map((country) => country.region))];
    
      setCountries(all);
      setRegions(regionList)
      setLoading(false);
    })
  }, [])

  return (
    <>
      <div className="flex flex-col min-h-screen bg-grBody">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home countries={countries} regions={regions} loading={loading}/>}/>
          <Route path="/about" element={<About />}/>
          <Route path="/country/:name" element={<CountryDetails countries={countries} regions={regions} loading={loading}/>}/>
        </Routes>
      </main>
      <Footer />
      </div>
    </>
  );
}
