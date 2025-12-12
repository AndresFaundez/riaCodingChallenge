import ConverterClient from "./ConverterClient";
import { getExchangeRate, getCurrencies } from "@/lib/frankfurter";

const  defaultBase = "USD";

const Converter = async () => {
  const currencies = await getCurrencies();

  return (
    <ConverterClient
    base = {defaultBase}
    currencies={currencies} />
  )
}

export default Converter