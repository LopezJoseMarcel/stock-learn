import { useState, useEffect } from "react";
import { StockMovement } from "@/types/interfacesModel";
import { stockMovementGetByUser } from "@/services/stockMovementGetByUser";
import { stockLastPriceService } from "@/services/stockLastPriceService";
import { StockMovementHook } from "@/types/interfacesModel";
import {filterMovement, counterStockType} from "@/utils/filterMovement";

const useMovementHook = (userId: string | null) => {
  const [stockMovements, setStockMovements] =
    useState<StockMovementHook | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovements = async () => {
      if (!userId) return;
      setLoading(true);
      setError(null);
      try {
        const movements: StockMovement[] = await stockMovementGetByUser(userId);
        console.log("movements", movements);
        let newMovement: StockMovementHook = {
          closePosition: [],
          openPosition: [],
        };

        if (movements.length > 0) {
          const {
            openPosition,
            closePosition,
          } = filterMovement(movements);

          for (const stock of openPosition) {
            const lastStockPrice = await stockLastPriceService(stock.symbol);
            const lastPrice: number = lastStockPrice.data.value.close;
            const openEntriesCount : number = counterStockType(stock.movements,"buy");

            newMovement.openPosition.push({ ...stock, lastPrice: Number(lastPrice), openSharesTotal: openEntriesCount });
          }

          for (const stock of closePosition) {
            const lastStockPrice = await stockLastPriceService(stock.symbol);
            const lastPrice: number = lastStockPrice.data.value.close;
            const closeEntriesCount : number = counterStockType(stock.movements,"sell");

            newMovement.closePosition.push({ ...stock, lastPrice: Number(lastPrice), openSharesTotal: closeEntriesCount });
          }

          setStockMovements(newMovement);
          console.log("newMovement", newMovement);
        }
      } catch (error) {
        setError("Error fetching user: " + error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovements();
  }, [userId]);

  return { stockMovements, loading, error };
};

export default useMovementHook;
