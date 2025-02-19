import React from "react";
import Image from "next/image";
import { Stock } from "@/types/interfacesModel";

interface StockItemParams {
    params: Stock
}

export default function StockItem({ params }: StockItemParams) {
    return (
        <div className='flex w-full items-start gap-4 border-b-4 p-4'>
        <div className='flex items-end gap-4'>
          <Image
            src={params.logoUrl as string}
            alt="stock"
            width={30}
            height={30}
            quality={85}
            className="object-contain"
            /> 
            <span className='text-customGrey_dark '>{params.meta.symbol}</span>
            <span className='text-customGreen_dark font-bold'> US { Number (params.value.close).toFixed(2)}</span>
        </div>
      </div>
    )
}