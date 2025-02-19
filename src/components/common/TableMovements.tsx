
import React from "react";
import { StockMovement } from "@/types/interfacesModel";
import getFirstDate from "@/utils/getfirstDate";

interface paramsInterface {
  params: {
    tableTitle: string;
    tableHeaders: string[];
    data: StockMovement[] ;
  };
}

export default  function TableMovements({ params }: paramsInterface) {
  return (
    <div className="w-full rounded-xl bg-white flex flex-col items-center py-2">
      <h3 className="text-customOrange_dark font-bold">{params.tableTitle}</h3>
      <table className="border-collapse">
        <thead>
          <tr>
          { params.tableHeaders.map(title => (
            <th key={ params.tableHeaders.indexOf(title) } className="px-4 py-2   text-customGrey_dark text-xs font-bold">
              {title}
            </th>
          )) 
          }
            
          </tr>
        </thead>
        <tbody>
          {params.data?.length > 0 ? (
            params.data.slice(0,5).map((element) => (
              <tr key={element.symbol} className="border-t border-gray-200">
                <td className="px-4 py-2 text-customGrey_dark text-xs font-thin text-center">
                  {element.symbol}
                </td>
                <td className="px-4 py-2 text-customGrey_dark text-xs font-thin text-center">
                  {element.openSharesTotal}
                </td>
                <td className="px-4 py-2 text-customGrey_dark text-xs font-thin text-center">
                  {getFirstDate(
                    element.movements.map((movement) => movement.openDate)
                  )}
                </td>
                <td className="px-4 py-2 text-customGrey_dark text-xs font-thin text-center">
                  US {element.lastPrice}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="text-center py-4 text-customGrey_dark text-center">
                No hay movimientos disponibles
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {params.data?.length > 4 && (
        <section className="flex w-full pr-7 justify-end">
          <h3 className="text-blue-400 text-xs font-thin text-center">see more</h3>
        </section>
       )

      }
     
    </div>
  );
}
