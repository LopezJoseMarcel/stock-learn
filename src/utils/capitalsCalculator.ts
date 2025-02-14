import { StockMovement } from "@/types/interfacesModel";
import { stockMovementGetByUser } from "@/services/stockMovementGetByUser";
import { stockLastPriceService } from "@/services/stockLastPriceService";

export default async function capitalsCalculator(userId: string, buyingPower: number) {
    try {
      const movements: StockMovement[] = await stockMovementGetByUser(userId);

  
      let grandTotOpenPrice = 0;
      let grandTotLastPrice = 0;
  
      if (movements.length > 0) {
        for (const stockMov of movements) {
          let totalOpenPrice = 0;
          let totalLastPrice = 0;
  
          const lastStockMov = await stockLastPriceService(stockMov.symbol);
          const lastPrice: number = lastStockMov.data.value.close;

          
          if (stockMov.movements.length > 0) {
            for (const mov of stockMov.movements) {
              totalOpenPrice += mov.openingPrice * mov.sharesQuantity;
              totalLastPrice += lastPrice * mov.sharesQuantity;
            }
          }
  
          grandTotOpenPrice += totalOpenPrice;
          grandTotLastPrice += totalLastPrice;
        }
      }

       const profitsLosses = grandTotLastPrice - grandTotOpenPrice;
  
      return { capital: buyingPower + grandTotLastPrice, grandTotOpenPrice,  profitsLosses};
    } catch (error) {
      console.error(error);
      throw error; // Re-lanza el error para manejarlo donde se llame la función
    }
  }
  