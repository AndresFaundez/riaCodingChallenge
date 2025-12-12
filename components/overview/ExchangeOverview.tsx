import ExchangeOverviewClient from "./ExchangeOverviewClient";
import  {getExchangeRate, getCurrencies} from "@/lib/frankfurter";

const  defaultBase = "USD";
const biggestCurrencies = [
    "EUR", "GBP", "JPY", "AUD", "CAD",
    "CHF", "CNY", "SEK", "NZD", "MXN",
  ];
  
const ExchangeOverview = async  () => {
  const rates = await getExchangeRate(defaultBase, biggestCurrencies);
  const currencies = await getCurrencies();
  return (
    <ExchangeOverviewClient 
    currencies={currencies}
    initialRates={rates}
    initialBase={defaultBase}
    symbols = {biggestCurrencies}/>
  );
};

export default ExchangeOverview;