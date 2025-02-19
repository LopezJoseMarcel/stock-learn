import React, { useEffect, useState } from "react";
import { Stock } from "@/types/interfacesModel";
import stockInsertMany from "@/services/stockInsertMany";

const useStockManyHook = (symbol: string) => {
  const [stock, setStock] = useState<Stock | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!symbol) return;

    const fetchStock = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await stockInsertMany(symbol);
        if (!data.lastStock) {
          setError("No se encontro");
        }

        let lastStock = data.lastStock;
        lastStock.logoUrl = data.urlLogo;
        setStock(lastStock);
      } catch (error) {
        setError("Error fetching stock: " + error);
      } finally {
        setLoading(false);
      }
    };

    fetchStock();
  }, [symbol]);

  return { stock, loading, error };
};

export default useStockManyHook;
