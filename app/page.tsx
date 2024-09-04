"use client";

import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";

interface dataType {
  id: string,
  rank: string,
  symbol: string,
  name: string,
  supply: string,
  priceUsd: string,
  volumeUsd24Hr: string
  changePercent24Hr: string,
  explorer: string,
  marketCapUsd: string,
  maxSupply: string,
  vwap24Hr: string
}

export default function Home() {
  const [lastUpdateTime, setLastUpdateTime] = useState<String | null>(null);
  const [data, setData] = useState<dataType[] | null>(null);
  const [currencyToSearch, setCurrencyToSearch] = useState<string | null>(null);
  const [currencySearched, setCurrencySearched] = useState<dataType | null>(null);
  
  const handleCurrencySearch = () => {
    const curr = data?.find((curr) => curr.id === currencyToSearch)
    if(curr)
    setCurrencySearched(curr);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const url = process.env.NEXT_PUBLIC_API_URL ?? "";
        const data = await fetch(url).then(res => res.json());
        setData(data.data);
        const lastUpdate = new Date(data.timestamp);
        setLastUpdateTime(lastUpdate.toString());
      }
      catch(error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  if(!data) {
    return(
      <p className="text-2xl p-20 md:px-40 lg:px-60">Loading...</p>
    )
  }

  return (
    <div className="px-20 md:px-40 lg:px-60">
      <Navbar />
      <div className="flex flex-col items-center text-center">
        <div>
          <p className="text-xl font-bold">Eth Stream</p>
          <p className="text-md font-bold">Last updated on { lastUpdateTime }</p>
        </div>
        <div className="flex items-center">
          <select className="cursor-pointer border-2 p-1 rounded-md" onChange={(e) => setCurrencyToSearch(e.target.value)}>
            <option selected disabled hidden>
              Select currency
            </option>
            {
              data?.map((item) => (
                <option key={item.id} value={item.id} >
                  { item.name }
                </option>
              ))
            }
          </select>
          <button className="px-4 py-1 m-2 border-2 rounded-md" onClick={ handleCurrencySearch } >Go</button>
        </div>

        {
          currencySearched &&
          <div className="text-left space-y-2">
            { currencySearched.name && <p>Name of the currency: { currencySearched.name }</p> }
            { currencySearched.symbol && <p>Symbol: { currencySearched.symbol }</p> }
            { currencySearched.rank && <p>Rank (in ascending order): { currencySearched.rank }</p> }
            { currencySearched.priceUsd && <p>Price: ${ parseFloat(currencySearched.priceUsd).toFixed(2) }</p> }
            { currencySearched.symbol && currencySearched.maxSupply && <p>Total quantity of { currencySearched.symbol } issued: { parseFloat(currencySearched.maxSupply).toFixed(2) }</p> }
            { currencySearched.changePercent24Hr && <p>Value change in the last 24 hrs: { currencySearched.changePercent24Hr }</p> }
            { currencySearched.marketCapUsd && <p>Market Cap: ${ parseFloat(currencySearched.marketCapUsd).toFixed(2) }</p> }
          </div>
        }
      </div>
    </div>
  );
}
