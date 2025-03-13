
export default async function getStockByDate(symbol: string, date: string){
    try {
      const res = await fetch(`/api/stock/stockByDate/${symbol}?date=${date}`, {
          method: "GET",
          headers: { "Content-Type" : "application/json"},
      });
  
      const data  = await res.json();
  
      if (!res.ok) {
          throw new Error("Response Error getting stocks");
      }
      console.log(data[0]);
      return data[0];
      
    } catch (error) {
      console.log(error);
    }
  }