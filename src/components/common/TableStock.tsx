import React from "react";
import { StockMovement } from "@/types/interfacesModel";
import { format } from "@formkit/tempo";


interface paramsInterface {
  params: {
    type: "buy" | "sell"
    tableTitle: string;
    tableHeaders: string[];
    data: StockMovement | null;
  };
}

export default function TableStock({ params }: paramsInterface) {
  return (
    <>
      {params.data && (
        <div className="w-5/6 rounded-xl bg-customOrange_light flex flex-col items-center py-2">
          <h3 className="text-customOrange_dark font-bold">
            {params.tableTitle}
          </h3>
          <table className="border-collapse">
            <thead>
              <tr>
                {params.tableHeaders.map((title) => (
                  <th
                    key={params.tableHeaders.indexOf(title)}
                    className="px-4 py-2   text-customGrey_dark text-xs font-bold"
                  >
                    {title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(params.data?.movements.length > 0 && params.data.movements.filter(mov => mov.movementType === params.type).length > 0 ) ? (
                params.data.movements.filter(mov => mov.movementType === params.type).slice(0, 5).map((element) => (
                  <tr
                    key={params.data?.movements.indexOf(element)}
                    className="border-t border-gray-200"
                  >
                    <td className="px-4 py-2 text-customGrey_dark text-xs font-thin text-center">
                      {element.sharesQuantity}
                    </td>
                    <td className="px-4 py-2 text-customGrey_dark text-xs font-thin text-center">
                      {  format(element.openDate, "YYYY-MM-DD", "us")}
                    </td>
                    <td className="px-4 py-2 text-customGrey_dark text-xs font-thin text-center">
                      {element.openingPrice}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="text-center py-4 text-customGrey_dark text-center"
                  >
                    No hay movimientos disponibles
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          {params.data?.movements.length > 4 && (
            <section className="flex w-full pr-7 justify-end">
              <h3 className="text-blue-400 text-xs font-thin text-center">
                see more
              </h3>
            </section>
          )}
        </div>
      )}
    </>
  );
}
