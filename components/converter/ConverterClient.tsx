"use client";
import {  useEffect, useState } from "react";
import { getExchangeRate } from "@/lib/frankfurter";

interface Props {
  base: string;
  currencies: Record<string, string>;
}

const ConverterClient = ({base, currencies}: Props) => {
  const [amount, setAmount] = useState(1);
  const [from, setFrom] = useState(base);
  const [to, setTo] = useState("EUR");
  const [result, setResult] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function convert() {
      if (!amount || isNaN(Number(amount))) {
        setResult(null);
        return;
      }
      setLoading(true);
      try {
        const rates = await getExchangeRate(from, [to]);
        setResult(rates[to]);
      } catch {
        setResult(null);
      }
      setLoading(false);
    }

    convert();
  }, [amount, from, to]);

  return (
    <section>
        <h2>Currency Converter</h2>
        <div>
            <label>Amount</label>
            <input
                type = "number"
                value = {amount}
                onChange={(e) => setAmount(Number(e.target.value))}
            />
        </div>
        <div>
            <label>From</label>
            <select value ={from} onChange={(e) => setFrom(e.target.value)}>
                {Object.entries(currencies).map(([code, name])=>(
                    <option key={code} value = {code}>
                        {code}-{name}
                    </option>
                ))}
            </select>
        </div>
        <div>
            <label>To</label>
            <select value ={to} onChange={(e) => setFrom(e.target.value)}>
                {Object.entries(currencies).map(([code, name])=>(
                    <option key={code} value = {code}>
                        {code}-{name}
                    </option>
                ))}
            </select>
        </div>
        {loading ? (
            <p>Converting...</p>
        ) : result != null ?(
            <p>{amount} {from} = {(amount * result).toFixed(4)} {to} </p>
        ) : (
            <p>Enter an amount to convert</p>
        )}       
    </section>
  );
};

export default ConverterClient;