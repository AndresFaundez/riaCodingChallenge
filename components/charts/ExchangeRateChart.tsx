import ExchangeRateChartClient from "./ExchangeRateChartClient";
import { getHistoricalRates } from "@/lib/frankfurter";


function formatDate(date: Date) {
  return date.toISOString().split("T")[0];
}

function getSafeEndDate() {
  const d = new Date();
  d.setDate(d.getDate() - 1); 
  return d;
}

const ExchangeRateChart = async () => {
  const from = "USD";
  const to = "EUR";

  const endDate = getSafeEndDate(); 
  const startDate = new Date(endDate);
  startDate.setDate(startDate.getDate() - 30); 

  const start = formatDate(startDate);
  const end = formatDate(endDate);


  let series: Record<string, number> = {};
    const rawRates = await getHistoricalRates(from, to, start, end);
    for (const date in rawRates) {
      if (rawRates[date]?.[to] != null) {
        series[date] = rawRates[date][to];
      }
    }

  return (
    <ExchangeRateChartClient
      from={from}
      to={to}
      series={series}
    />
  );
};

export default ExchangeRateChart;
