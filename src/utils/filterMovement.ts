import { StockMovement, MovementsEntries } from "@/types/interfacesModel";

export function filterMovement(stocksMov: StockMovement[]) {
  const openPosition = stocksMov.filter(stock => stock.movements.some(mov => mov.movementType === "buy"));
  const closePosition = stocksMov.filter(stock => stock.movements.every(mov => mov.movementType != "buy"));

  return { openPosition, closePosition};
}



export function counterStockType(movementEntries: MovementsEntries[], entriesType: "buy" | "sell" ) : number {
    let stocksQuantity: number = 0;

    switch (entriesType) {
      case "buy":
        movementEntries.forEach( mov => {
          if (mov.movementType === "buy") {
            stocksQuantity += mov.sharesQuantity;
          }
        } )
  
        break;
      case "sell":

      stocksQuantity += movementEntries.reduce((acc, current) => acc + current.sharesQuantity, 0)
        
      break;
    }

    return stocksQuantity;

}

