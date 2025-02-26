import useSWRInfinite from "swr/infinite";
import { useCallback } from "react";

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function useStockData(symbol: string, limit = 100) {
  const getKey = useCallback((pageIndex: number, previousPageData: any) => {
    if (!symbol) return null; // No hacer petición si no hay símbolo
    if (previousPageData && previousPageData.data.length === 0) return null; // Detener si no hay más datos
    return `/api/stock/${symbol}?page=${pageIndex + 1}&limit=${limit}`;
  }, [symbol, limit]);

  const { data, size, setSize, isLoading, error } = useSWRInfinite(getKey, fetcher,
    {
      revalidateFirstPage: false, // Evita que se vuelva a solicitar la página 1
      revalidateOnFocus: false, //  No volver a hacer la petición al cambiar de pestaña
      revalidateOnReconnect: false, //No hacer la petición si la conexión cambia
      persistSize: true, // Mantiene las páginas ya cargadas
    }
  );

  interface StockEntry {
    datetime: string;
    close: number;
  }

  interface PageData {
    data: {
      value: {
        datetime: string;
        close: string;
      };
    }[];
  }

  const stocks: StockEntry[] = data
    ? data.flatMap((page: PageData) =>
        page.data.map(entry => ({
          datetime: entry.value.datetime,
          close: parseFloat(entry.value.close),
        }))
      )
      .sort((a, b) => new Date(a.datetime).getTime() - new Date(b.datetime).getTime()) // Ordenar ASCENDENTE
    : [];

  const hasMore = data?.[data.length - 1]?.data.length !== 0;

  return { stocks, isLoading, error, hasMore, loadMore: () => setSize(size + 1), size, setSize };
}
