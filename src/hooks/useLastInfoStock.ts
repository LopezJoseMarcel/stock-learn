import React, { useEffect, useState } from "react";
import { Stock } from "@/types/interfacesModel";
import { stockLastPriceService } from "@/services/stockLastPriceService";

export default function useLastInfoStock(symbol: string) {
    const [ stockInfo, setStockInfo ] = useState<Stock | null>(null);
    const [ loading, setLoading ] = useState<boolean>(false);
    const [ error, setError ] = useState<string | null>(null);

    useEffect(() => {
      const fetchStock = async () => {
        setLoading(true);
        setError(null);
        try {
            const dataRes =  await stockLastPriceService(symbol);
            console.log("dataRes",dataRes);
            if (!dataRes.lastStock) {
              setError("No se encontro");
            }
            setStockInfo({
                ...dataRes.data,
                logoUrl: dataRes.urlLogo
            })
        } catch (error) {
            setLoading(false);
            setError("Error al traer la informacion");
        } finally {
            setLoading(false);
        }
      }

      fetchStock();
    }, [symbol])

  return { stockInfo, loading, error };
}