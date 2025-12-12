"use client";

import { useEffect, useState } from "react";
import { getExchangeRate } from "@/lib/frankfurter";

interface Props {
  currencies: Record<string, string>;
  initialRates: Record<string, number>;
  initialBase: string;
  symbols: string[];
}

const ExchangeOverviewClient = ({
  currencies,
  initialRates,
  initialBase,
  symbols,
}: Props) => {
  const [base, setBase] = useState(initialBase);
  const [rates, setRates] = useState(initialRates);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const newRates = await getExchangeRate(base, symbols);
      setRates(newRates);
      setLoading(false);
    }
    load();
  }, [base, symbols]);

  return (
    <section className="w-full max-w-5xl mx-auto mt-12 mb-20 px-4">
      {/* Contenedor Principal con efecto Glass */}
      <div className="glass rounded-2xl p-6 sm:p-8 border border-white/10 shadow-2xl relative overflow-hidden">
        
        {/* Header: Título y Selector */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-6">
          <div className="space-y-1">
            <h2 className="text-3xl font-bold font-schibsted-grotesk text-white">
              Tasas de Cambio
            </h2>
            <p className="text-light-200 text-sm">
              Actualizaciones en tiempo real
            </p>
          </div>

          {/* Selector Estilizado */}
          <div className="relative group w-full md:w-64">
            <select
              value={base}
              onChange={(e) => setBase(e.target.value)}
              className="w-full appearance-none bg-dark-200 text-white border border-dark-200 hover:border-primary/50 transition-colors rounded-xl px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-primary/50 cursor-pointer shadow-lg"
            >
              {Object.keys(currencies).map((code) => (
                <option key={code} value={code} className="bg-dark-200">
                  {code} - {currencies[code]}
                </option>
              ))}
            </select>
            {/* Icono de flecha custom (CSS puro) */}
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </div>
          </div>
        </div>

        {/* Grid de Monedas */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
            <p className="text-light-100 animate-pulse">
              Obteniendo últimas tasas...
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(rates).map(([currency, rate]) => (
              <div
                key={currency}
                className="group relative bg-dark-200/40 hover:bg-dark-200/80 border border-white/5 hover:border-primary/30 rounded-xl p-5 transition-all duration-300 hover:-translate-y-1 cursor-default"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="bg-dark-100 rounded-lg p-2 border border-white/5 group-hover:border-primary/20 transition-colors">
                    {/* Placeholder de bandera o símbolo */}
                    <span className="text-primary font-bold text-lg">
                      {currency}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-light-200 bg-white/5 px-2 py-1 rounded-full">
                    1 {base}
                  </span>
                </div>

                <div className="mt-4">
                  <p className="text-light-200 text-xs uppercase tracking-wider mb-1">
                    Valor Actual
                  </p>
                  <p className="text-2xl font-bold text-white group-hover:text-primary transition-colors font-martian-mono tracking-tight">
                    {rate.toFixed(4)}
                  </p>
                </div>
                
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl pointer-events-none" />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ExchangeOverviewClient;