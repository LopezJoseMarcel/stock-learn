"use client";
import React from "react";
import CabeceraStock from "../common/CabeceraStock";
import StockChart from "../common/StockChart";
import { useUser } from "@/contexts/userContex";
import useMovementHook from "@/hooks/useMovementsHook";
import ButtonText from "../common/ButtonText";
import { useRouter } from "next/navigation";
import PositionSection from "../containers/PositionSecction";

export default function StockInfoPage({ symbol }: { symbol: string }) {
  const { user } = useUser();
  const { stockMovements, loading } = useMovementHook(user?.id ?? "");
  const router  = useRouter();

  const handleRoute = () => {
    router.push(`/stock/${symbol}/negotiate`);
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <CabeceraStock params={{ symbol: symbol }} />
      <section className="flex  justify-center">
        <StockChart params={{ symbol: symbol }} />
      </section>
      <PositionSection params={{stockMovements: stockMovements, loading, symbol}}/>
      <footer className="flex w-full items-center justify-center mt-3 mb-3">
         <ButtonText params={{ text: "Negociar" , type:"button" , onClick:handleRoute }}  />
      </footer>
    </div>
  );
}
