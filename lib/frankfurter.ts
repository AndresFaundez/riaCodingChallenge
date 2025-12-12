const API_URL = 'https://api.frankfurter.app';


//Define type frankfurtResponse so ts doesnt throw errors

type FrankfurterResponse = {
    amount:number;
    base: string;
    date: string;
    rates: Record<string,number>;
};

async function getExchangeRate(base: string, symbols: string[]){
    const targets = symbols.join(',') 
    const res = await fetch(`${API_URL}/latest?from=${base}&to=${targets}`);
    if (!res.ok){
        throw new Error('Error al obtener rates');
    }
    const data = (await res.json()) as FrankfurterResponse;
    return data.rates;
} 

export default getExchangeRate;