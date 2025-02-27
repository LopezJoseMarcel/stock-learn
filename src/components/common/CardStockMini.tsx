import React from "react";
import Image from "next/image";
import { StockModelInfo } from "@/types/interfacesModel";
import Link from "next/link";

interface CardStockMiniParams {
  params: {
    stock: StockModelInfo;
  };
}

export default function CardStockMini({ params }: CardStockMiniParams) {
  return (
    <Link href={`/stock/${params.stock.symbol}`}>
      <div className="flex flex-col items-center justify-center border border-customGrey_light w-24 h-24 min-w-[5rem] min-h-[5rem] rounded-2xl p-2">
        <span className="text-center font-semibold text-customGrey_dark text-xs">
          {params.stock.symbol}
        </span>
        <Image
          src={params.stock.logo_url}
          alt="stock"
          width={30}
          height={30}
          quality={85}
          className="object-contain"
        />
      </div>
    </Link>
    
  );
}
