//"use clientS"
import React, { useState } from "react";
import { StockMovement } from "@/types/interfacesModel";
import { useFormContext } from "react-hook-form";
import { MovementsEntries } from "@/types/interfacesModel";

interface PropsStockGroup {
  props: {
    data: StockMovement;
  };
}

export default function StockGroupToNego({ props }: PropsStockGroup) {
  const { setValue } = useFormContext();


  return (
    <div className="w-full rounded-xl bg-white flex flex-col items-center py-2">
      <h3 className="text-customOrange_dark font-bold">
        Seleccione una posición para vender
      </h3>
      <table className="border-collapse w-full">
        <thead>
          <tr>
            <th className="px-2 py-2 text-customGrey_dark text-xs font-bold text-center"></th>
            <th className="px-4 py-2 text-customGrey_dark text-xs font-bold text-center">Fecha Compra</th>
            <th className="px-4 py-2 text-customGrey_dark text-xs font-bold text-center">Precio de Apertura (USD)</th>
            <th className="px-4 py-2 text-customGrey_dark text-xs font-bold text-center">Cantidad</th>
          </tr>
        </thead>
        <tbody>
          {props.data.movements.length > 0 ? (
            props.data.movements.filter(mov => mov.movementType == "buy").map((mov) => (
              <tr key={mov._id} className="border-t border-gray-200">
                <td className="px-2 py-2 text-center">
                  <input
                    type="radio"
                    name="stockSelection"
                    value={mov._id}
                    onChange={() => {
                      setValue("movSelected", mov || null);
                      setValue("sharesQuantity", mov.sharesQuantity);
                    }}
                    className="accent-customOrange_dark"
                  />
                </td>
                
                <td className="px-4 py-2 text-customGrey_dark text-xs font-thin text-center">
                  {mov.openDate.toString().split("T")[0]}
                </td>
                <td className="px-4 py-2 text-customGrey_dark text-xs font-thin text-center">
                  USD {mov.openingPrice}
                </td>
                <td className="px-4 py-2 text-customGrey_dark text-xs font-thin text-center">
                  {mov.sharesQuantity}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center py-4 text-customGrey_dark text-xs">
                No hay movimientos disponibles
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
