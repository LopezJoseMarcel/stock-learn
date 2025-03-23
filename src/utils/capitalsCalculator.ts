import { StockMovement } from "@/types/interfacesModel";
import { stockMovementGetByUser } from "@/services/stockMovementGetByUser";
import { stockLastPriceService } from "@/services/stockLastPriceService";

export default async function capitalsCalculator(userId: string, buyingPower: number) {
    try {
      const stockMovement: StockMovement[] = await stockMovementGetByUser(userId);

      let grandTotOpenPrice = 0;
      let grandTotLastPrice = 0;
  
      if (stockMovement.length > 0) {

        for (const stockMov of stockMovement) {
          let totalOpenPrice = 0;
          let totalLastPrice = 0;
  
          const lastStockMov = await stockLastPriceService(stockMov.symbol);
          const lastPrice: number = lastStockMov.data.value.close;
          
          const stockEntries = stockMov.movements.filter(entry => entry.movementType == "buy");
          
          if (stockEntries.length > 0) {
            for (const mov of stockEntries) {
              totalOpenPrice += mov.openingPrice * mov.sharesQuantity;
              totalLastPrice += lastPrice * mov.sharesQuantity;
            }
          }
  
          grandTotOpenPrice += totalOpenPrice;
          grandTotLastPrice += totalLastPrice;
        }
      }

       const profitsLosses = grandTotLastPrice - grandTotOpenPrice;
       console.log("buyingPower + grandTotLastPrice", buyingPower + grandTotLastPrice);
       console.log("profitsLosses", profitsLosses);

      return { capital: buyingPower + grandTotLastPrice, grandTotOpenPrice,  profitsLosses};
    } catch (error) {
      console.error(error);
      throw error; // Re-lanza el error para manejarlo donde se llame la función
    }
  }
  