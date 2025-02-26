
export default async function getStocksSymbol(symbol: string, page: number, limit: number = 100){
  try {

    const res = await fetch(`/api/stock/AAPL?page=${page}&limit=${limit}`, {
        method: "GET",
        headers: { "Content-Type" : "application/json"},
    });

    const data  = await res.json();

    if (!res.ok) {
        throw new Error("Response Error getting stocks");
    }

    return data.data;
    
  } catch (error) {
    console.log(error);
  }
}