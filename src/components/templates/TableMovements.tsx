import React from "react";

interface paramsInterface{
  params: {
    tableTitle: string[];
    data: string[];
  }
}

export default function TableMovements() {
  return (
    <div className="rounded-xl bg-white flex flex-col items-center py-2">
      <h3 className="text-customOrange_dark font-bold">Posiciones Abiertas</h3>
      <table className="border-collapse">
        <thead>
          <tr>
            <th className="px-4 py-2   text-customGrey_dark text-xs font-bold">Symbol</th>
            <th className="px-4 py-2   text-customGrey_dark text-xs font-bold">Quantity</th>
            <th className="px-4 py-2   text-customGrey_dark text-xs font-bold">Open Date</th>
            <th className="px-4 py-2   text-customGrey_dark text-xs font-bold">Last Price</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-t border-gray-200">
            <td className="px-4 py-2 text-customGrey_dark text-xs font-thin">Celda 1</td>
            <td className="px-4 py-2 text-customGrey_dark text-xs font-thin">Celda 2</td>
            <td className="px-4 py-2 text-customGrey_dark text-xs font-thin">Celda 3</td>
            <td className="px-4 py-2 text-customGrey_dark text-xs font-thin">Celda 3</td>
          </tr>
          <tr className="border-t border-gray-200">
            <td className="px-4 py-2 text-customGrey_dark text-xs font-thin">Celda 4</td>
            <td className="px-4 py-2 text-customGrey_dark text-xs font-thin">Celda 5</td>
            <td className="px-4 py-2 text-customGrey_dark text-xs font-thin">Celda 6</td>
            <td className="px-4 py-2 text-customGrey_dark text-xs font-thin">Celda 6</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
