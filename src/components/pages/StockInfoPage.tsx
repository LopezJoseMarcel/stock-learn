"use client";
import React from "react";
import CabeceraStock from "../common/CabeceraStock";
import LabelPrice from "../common/LabelPrice";
import StockChart from "../common/StockChart";
import { useUser } from "@/contexts/userContex";
import TableStock from "../common/TableStock";
import useMovementHook from "@/hooks/useMovementsHook";
import { CircularProgress } from "@mui/material";



export default function StockInfoPage({ symbol }: { symbol: string }) {
 
  const { user } = useUser();
  const { stockMovements, loading } = useMovementHook(user?.id ?? "");
  const filtredOpenStock =
    stockMovements?.allPosition.find((stock) => stock.symbol === symbol) ||
    null;
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <CabeceraStock />
      <LabelPrice params={{ text: "400.11" }} />
      <section className="flex  justify-center">
        <StockChart params={{ symbol: symbol }} />
      </section>

      <section className="flex flex-col items-center content-center gap-4">
        {(stockMovements && !loading) ? (
          <>
            <TableStock
              key={"open"}
              params={{
                type: "buy",
                tableHeaders: ["Quantity", "Open Date", "Open Price"],
                tableTitle: "Open Positions",
                data: filtredOpenStock,
              }}
            />
            <>
              <TableStock
                key={"open"}
                params={{
                  type: "sell",
                  tableHeaders: ["Quantity", "Open Date", "Open Price"],
                  tableTitle: "Close Positions",
                  data: filtredOpenStock,
                }}
              />
            </>
          </>
        ): 
         <CircularProgress color="success" />
        }
      </section>
    </div>
  );
}
