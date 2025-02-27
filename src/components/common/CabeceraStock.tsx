"use client";
import Image from "next/image";
import LabelPrice from "../common/LabelPrice";
import useLastInfoStock from "@/hooks/useLastInfoStock";
import { CabeceraStockProps } from "@/types/interfacesElement";
import { CircularProgress } from "@mui/material";
import ButtonGoBack from "./ButtonGoBack";

interface CabeceraStockParams {
  params: CabeceraStockProps;
}

export default function CabeceraStock({ params }: CabeceraStockParams) {
  const { stockInfo, loading, error } = useLastInfoStock(params.symbol);

  return (
    <>
      <div className="m-3">
        <ButtonGoBack/>
      </div>
      {!loading && stockInfo ? (
        <header className="bg-white flex justify-between p-4">
          <div className="flex flex-col gap-2">
            <Image
              src={stockInfo?.logoUrl || "/Icon-02.svg"}
              alt="stock"
              width={30}
              height={30}
              quality={85}
              className="object-contain"
            />
            <span className="text-customGrey_dark font-thin">
              {params.symbol}
            </span>
            <LabelPrice
              params={{
                text: Number(stockInfo?.value.close).toFixed(2) || "-",
              }}
            />
          </div>
        </header>
      ) : (
        <div className="flex justify-center mt-4">
          <CircularProgress color="success" />
        </div>
      )}
    </>
  );
}
