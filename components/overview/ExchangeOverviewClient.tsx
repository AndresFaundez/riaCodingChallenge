"use client";

import { useEffect, useState } from "react";
import  getExchangeRate  from "@/lib/frankfurter";

interface Props {
  currencies: Record<string, string>;
  initialRates: Record<string, number>;
}


const ExchangeOverviewClient = ({ currencies, initialRates }: Props) => {
  const [base, setBase] = useState("USD");
  const [rates, setRates] = useState(initialRates);
  const [loading, setLoading] = useState(false); //Strictly for UI 

  const biggestCurrencies = [
    "EUR", "GBP", "JPY", "AUD", "CAD",
    "CHF", "CNY", "SEK", "NZD", "MXN",
  ];
  const mainRate = rates["EUR"];

  useEffect(()=>{
    async function load(){
      setLoading(true)      //the idea behind using loading is for better ui
      const newRates = await getExchangeRate(base, biggestCurrencies);
      setRates(newRates);
      setLoading(false);
    }
    load();
  }, [base]);

  return (
    <section>
      <h2>Exchange Rates Overview</h2>
      <select value={base} onChange={(e)=>setBase(e.target.value)}>
        {Object.keys(currencies).map((code)=>(
          <option key ={code} value ={code}>
            {code}-{currencies[code]}
          </option>
        ))}
      </select>
      {loading ? (
        <p>Loading rates...</p>
      ) : (
        <ul>
          {Object.entries(rates).map(([currency,rate]) => (
            <li key = {currency}>
              1 {base} = {rate.toFixed(4)} {currency}
            </li>
          ))}
        </ul>
      )}
    </section>
    
  );
};

export default ExchangeOverviewClient;