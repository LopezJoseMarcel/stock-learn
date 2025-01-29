import React from "react";
import LabelInfo from "@/components/common/LabelInfo";
import TableMovements from "@/components/templates/TableMovements";

function HomePage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="bg-white">
        <div className="container  mx-auto px-4 py-8">
          <LabelInfo params={{titleMoney:"US 100.000", titleText: "CAPITAL"}}/>
          <LabelInfo params={{titleMoney:"US 100.000", titleText: "PROFITS/LOSSES"}}/>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8 bg-customGreen_to_light rounded-t-3xl rounded-b-none">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <TableMovements />
          <TableMovements />
          <TableMovements />
          <TableMovements />
          <TableMovements />
          <TableMovements />
        </div>
        <div className="fixed bottom-0  p-4 ">
          <div className="fixed bottom-0 left-0 right-0  p-4 flex justify-center">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Mi Botón
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default HomePage;
