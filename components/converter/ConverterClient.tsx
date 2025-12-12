"use client";

import { useEffect, useState } from "react";
import { getExchangeRate } from "@/lib/frankfurter";

interface Props {
  base: string;
  currencies: Record<string, string>;
}

const ConverterClient = ({ base, currencies }: Props) => {
  const [amount, setAmount] = useState<number | string>(1); // Permitir string temporalmente para inputs vacíos
  const [from, setFrom] = useState(base);
  const [to, setTo] = useState("EUR");
  const [result, setResult] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  // Helper para renderizar iconos de flecha (reutilizable)
  const ChevronDown = () => (
    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-primary">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
    </div>
  );

  useEffect(() => {
    async function convert() {
      const numAmount = Number(amount);
      if (!amount || isNaN(numAmount)) {
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
    <section className="w-full max-w-5xl mx-auto mb-20 px-4">
      <div className="glass rounded-2xl p-6 sm:p-10 border border-white/10 shadow-2xl relative overflow-hidden">
        
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold font-schibsted-grotesk text-white mb-2">
            Conversor Universal
          </h2>
          <p className="text-light-200 text-sm">
            Calcula el valor exacto entre divisas al instante.
          </p>
        </div>

        {/* Inputs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 items-end">
          
          {/* Amount Input */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-light-200 uppercase tracking-wider pl-1">
              Cantidad
            </label>
            <div className="relative">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-dark-200 text-white font-martian-mono text-lg border border-dark-200 focus:border-primary/50 rounded-xl px-4 py-3 outline-none transition-all placeholder:text-gray-600"
                placeholder="0.00"
              />
            </div>
          </div>

          {/* From Select */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-light-200 uppercase tracking-wider pl-1">
              De
            </label>
            <div className="relative group">
              <select
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="w-full appearance-none bg-dark-200 text-white font-medium border border-dark-200 focus:border-primary/50 rounded-xl px-4 py-3 pr-10 cursor-pointer outline-none transition-all"
              >
                {Object.entries(currencies).map(([code, name]) => (
                  <option key={code} value={code} className="bg-dark-200">
                    {code} - {name}
                  </option>
                ))}
              </select>
              <ChevronDown />
            </div>
          </div>

          {/* To Select */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-light-200 uppercase tracking-wider pl-1">
              A
            </label>
            <div className="relative group">
              <select
                value={to}
                // CORRECCIÓN IMPORTANTE: Antes tenías setFrom aquí
                onChange={(e) => setTo(e.target.value)}
                className="w-full appearance-none bg-dark-200 text-white font-medium border border-dark-200 focus:border-primary/50 rounded-xl px-4 py-3 pr-10 cursor-pointer outline-none transition-all"
              >
                {Object.entries(currencies).map(([code, name]) => (
                  <option key={code} value={code} className="bg-dark-200">
                    {code} - {name}
                  </option>
                ))}
              </select>
              <ChevronDown />
            </div>
          </div>
        </div>

        {/* Result Area */}
        <div className="bg-dark-200/50 rounded-xl p-6 border border-white/5 flex flex-col items-center justify-center min-h-[120px] relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-50"></div>
          
          {loading ? (
            <div className="flex flex-col items-center gap-3">
               <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
               <span className="text-sm text-light-200 animate-pulse">Calculando...</span>
            </div>
          ) : result !== null && amount ? (
            <div className="text-center animate-in fade-in zoom-in duration-300">
              <p className="text-light-200 text-sm mb-2 font-mono">
                {amount} {from} =
              </p>
              <p className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-primary to-white font-martian-mono tracking-tight">
                {(Number(amount) * result).toFixed(4)} <span className="text-2xl text-white/50">{to}</span>
              </p>
              <p className="text-xs text-light-200/50 mt-2">
                1 {from} = {result.toFixed(4)} {to}
              </p>
            </div>
          ) : (
            <div className="text-center text-light-200/50">
              <p>Ingresa un monto para ver la conversión</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ConverterClient;