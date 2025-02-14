"use client"
import React from "react";
import LabelInfo from "@/components/common/LabelInfo";
//import TableMovements from "@/components/templates/TableMovements";
import { useUser } from "@/contexts/userContex";
import useUserHook from "@/hooks/useUserHook";
import useCapitalsHook from "@/hooks/useCapitalsHook";
import { CircularProgress } from "@mui/material";
import ButtonTextSec from "../common/ButtonTextSec";
import useMovementHook from "@/hooks/useMovementsHook";
import TableMovements from "../common/TableMovements";

function DashboardPage() {

 const { user } = useUser();
 const { profile } = useUserHook(user?.id ?? "");
 const { capital, loading: loadingCapital} = useCapitalsHook(user?.id, profile?.buyingPower ?? null);
 const { stockMovements, loading } = useMovementHook(user?.id ?? null);
  
  return (
    
    <div className="min-h-screen bg-white flex flex-col">
      <header className="bg-white">
        <div className="container  mx-auto px-4 py-8 flex flex-col items-center " >
          { loadingCapital || capital === null ? <CircularProgress color="success"/> : <>
            <LabelInfo params={{titleMoney:`US ${ capital?.capital ?  capital.capital.toFixed(2) : 0  }`, titleText: "CAPITAL"}}/>
            <LabelInfo params={{titleMoney:`US ${ capital?.profitsLosses ? capital.profitsLosses.toFixed(2) : 0 }`, titleText: "PROFITS/LOSSES"}}/>
          </>
          }
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8 bg-customGreen_to_light rounded-t-3xl rounded-b-none">
        { !stockMovements && loading ?  
         <CircularProgress color="success"/>
        : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {stockMovements && <TableMovements params={{tableTitle: ["Symbol","Quantity","Open Date","Last Price"],
             data: stockMovements.openPosition }} />}
          </div>)
          
        }
        
        <div className="fixed bottom-0  p-4 ">
          <div className="fixed bottom-0 left-0 right-0  p-4 flex justify-center">
            <ButtonTextSec params={{text: "Buscar", type:"button"}} />
          </div>
        </div>
      </main>
    
    </div>
  );
}

export default DashboardPage;
