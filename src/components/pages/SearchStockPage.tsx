"use client";
import React, { useState } from "react";
import SearchStockSection from "../containers/SearchStockSection";
import PopularStockCarrousel from "../containers/PopularStockCarrusel";
import StockItem from "../common/StockItem";
import { useForm, FormProvider } from "react-hook-form";
import useStockManyHook from "@/hooks/useStockManyHook";
import Alert from "@mui/material/Alert";


export default function SearchStockPage() {
  const methods = useForm<{ query: string }>();
  const [symbol, setSymbol] = useState<string>("");

  // Hook que busca la acción cuando cambia `symbol`
  const { stock, loading, error } = useStockManyHook(symbol);

  const onSubmit = (data: { query: string }) => {
    if (!data.query.trim()) return; // Evita búsquedas vacías
    setSymbol(data.query.toLocaleUpperCase());
  };

  return (
    <FormProvider {...methods}>
      <section className="min-h-screen bg-white">
        <section className="flex justify-center flex-col items-center gap-6">
          <SearchStockSection onSubmit={onSubmit} loading={loading} />
          {!stock ? <PopularStockCarrousel /> : <StockItem params={stock} />}
          {error && (
            <Alert variant="filled" color="warning" severity="info">
              No se encontró el simbolo
            </Alert>
          )}
        </section>
      </section>
    </FormProvider>
  );
}
