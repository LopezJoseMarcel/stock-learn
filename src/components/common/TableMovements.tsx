//"use client"

import React from "react";
import { StockMovement } from "@/types/interfacesModel";
import getFirstDate from "@/utils/getfirstDate";

interface paramsInterface {
  params: {
    tableTitle: string[];
    data: StockMovement[];
  };
}

export default async function TableMovements({ params }: paramsInterface ) {




  return (
    <div className="rounded-xl bg-white flex flex-col items-center py-2">
      <h3 className="text-customOrange_dark font-bold">Posiciones Abiertas</h3>
      <table className="border-collapse">
        <thead>
          <tr>
            {params.tableTitle.map((title) => (
              <th className="px-4 py-2   text-customGrey_dark text-xs font-bold">
                {title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {params.data.map((element) => (
            <tr className="border-t border-gray-200">
              <td className="px-4 py-2 text-customGrey_dark text-xs font-thin">
                {element.symbol}
              </td>
              <td className="px-4 py-2 text-customGrey_dark text-xs font-thin">
                {element.sharesQuantityTotal}
              </td>
              <td className="px-4 py-2 text-customGrey_dark text-xs font-thin">
                {getFirstDate(element.movements.map(movement => movement.openDate))?.toString()}
              </td>
              <td className="px-4 py-2 text-customGrey_dark text-xs font-thin">
                {element.averageOpeningPrice}
              </td>
            </tr>
          ))}

          
        </tbody>
      </table>
    </div>
  );
}
