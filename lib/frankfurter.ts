const API_URL = 'https://api.frankfurter.app';


//Define type frankfurtResponse so ts doesnt throw errors

type FrankfurterResponse = {
    amount:number;
    base: string;
    date: string;
    rates: Record<string,number>;
};

export async function getExchangeRate(base: string, symbols: string[]){
    const targets = symbols.join(',') 
    const res = await fetch(`${API_URL}/latest?from=${base}&to=${targets}`);
    if (!res.ok){
        throw new Error('Error while obtaining rates');
    }
    const data = (await res.json()) as FrankfurterResponse;
    return data.rates;
} 

export async function getCurrencies(){
    const res = await fetch(`${API_URL}/currencies`);
    if (!res.ok){
        throw new Error('Error while getting currencies');
    }
    return res.json();
}

