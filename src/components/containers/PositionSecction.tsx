import React from "react";
import TableStock from "../common/TableStock";
import { CircularProgress } from "@mui/material";
import { StockMovementHook } from "@/types/interfacesModel";

interface PositionSectionProps {
    params: {
       stockMovements: StockMovementHook | null; 
       loading: boolean; 
       symbol: string;
    }
    
}

export default function PositionSection({ params }: PositionSectionProps) {

    const filtredOpenStock = params.stockMovements?.allPosition.find((stock) => stock.symbol === params.symbol) ||
    null;


 return (
    <section className="flex flex-col items-center content-center gap-4">
            {params.stockMovements && !params.loading ? (
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
            ) : (
              <CircularProgress color="success" />
            )}
          </section>
 )
}