"use client";

import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import LineChart from "./components/LineChart";

Chart.register(CategoryScale);

export interface dataType {
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
};

export interface pricesType {
  priceUsd: number,
  time: number,
  date: string
}

export default function Home() {
  const [lastUpdateTime, setLastUpdateTime] = useState<String | null>(null);
  const [data, setData] = useState<dataType[] | null>(null);
  const [currencyToSearch, setCurrencyToSearch] = useState<string | null>(null);
  const [currencySearched, setCurrencySearched] = useState<dataType | null>(null);
  const [prices, setPrices] = useState<pricesType[] | null>(null);

  const handleCurrencySearch = () => {
    const curr = data?.find((curr) => curr.id === currencyToSearch)
    if(curr)
    setCurrencySearched(curr);
  };

  const generateGraph = async () => {
    const intervals = ["m1", "m5", "m15", "m30", "h1", "h2", "h6", "h12", "d1"];
    const interval = intervals[8]; // d1
    try {
      const URL = `${process.env.NEXT_PUBLIC_API_URL}/${currencySearched?.id}/history?interval=${interval}`;
    
      const response = await fetch(URL).then(res => res.json());
      setPrices(response.data);
    }
    catch(error) {
      console.log(error);
    }
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

  // reset price graph on change
  useEffect(() => {
    setPrices(null);
  }, [currencySearched]);

  // reset currency searched on change
  useEffect(() => {
    setCurrencySearched(null)
  }, [currencyToSearch]);

  if(!data) {
    return(
      <p className="text-2xl p-20 md:px-40 lg:px-60">Loading...</p>
    )
  }

  return (
    <div className="px-20 md:px-40 lg:px-60">
      <Navbar />
      <div className="flex flex-col items-center text-center space-y-4">
        <div>
          <p className="text-2xl font-bold">Eth Stream</p>
          <p className="text-md font-bold">Last updated on { lastUpdateTime }</p>
        </div>
        <div className="flex items-center">
          <select className="bg-fontColor text-bgColor cursor-pointer border-2 p-1 rounded-md" onChange={(e) => setCurrencyToSearch(e.target.value)}>
            <option selected disabled hidden>
              Select currency
            </option>
            {
              data?.map((item) => (
                <option className="bg-bgColor text-fontColor" key={item.id} value={item.id} >
                  { item.name }
                </option>
              ))
            }
          </select>
          <button
            className="px-4 py-1 m-2 border-2 rounded-md bg-fontColor text-bgColor hover:bg-bgColor hover:text-fontColor"
            onClick={ handleCurrencySearch }
          >
            Go
          </button>
        </div>

        {
          currencySearched &&
          <div>
            <div className="text-left space-y-2">
              { currencySearched.name && <p>Name of the currency: { currencySearched.name }</p> }
              { currencySearched.symbol && <p>Symbol: { currencySearched.symbol }</p> }
              { currencySearched.rank && <p>Rank (in ascending order): { currencySearched.rank }</p> }
              { currencySearched.priceUsd && <p>Price: ${ parseFloat(currencySearched.priceUsd).toFixed(2) }</p> }
              { currencySearched.symbol && currencySearched.maxSupply && <p>Total quantity of { currencySearched.symbol } issued: { parseFloat(currencySearched.maxSupply).toFixed(2) }</p> }
              { currencySearched.changePercent24Hr && <p>Value change in the last 24 hrs: { currencySearched.changePercent24Hr }</p> }
              { currencySearched.marketCapUsd && <p>Market Cap: ${ parseFloat(currencySearched.marketCapUsd).toFixed(2) }</p> }
            </div>
            <div>
              <button
                className="px-4 py-1 m-2 mt-6 border-2 rounded-md bg-fontColor text-bgColor hover:bg-bgColor hover:text-fontColor"
                onClick={generateGraph}
              >
                Click here to see price graph
              </button>
            </div>
          </div>
        }
      </div>
      {
        prices &&
        <LineChart
          prices={ prices }
          currencySearched={ currencySearched }
        />
      }
    </div>
  );
}
