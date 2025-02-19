import React from "react";
import CardStockMini from "../common/CardStockMini";
import { popularStocks } from "@/data/popularStocks";

export default function PopularStockCarrousel() {
  return (
    <section className="flex flex-col align-center  w-full">
      <h1 className="font-bold text-customGrey_dark text-xl ml-4">
        Acciones Populares
      </h1>
      <div className="w-full max-w-lg mx-auto overflow-x-auto scroll-smooth snap-x snap-mandatory flex gap-4 p-4 scrollbar-hide">
        {popularStocks.map((stock) => (
          <CardStockMini key={stock.symbol} params={{ stock }} />
        ))}
      </div>
    </section>
  );
}
