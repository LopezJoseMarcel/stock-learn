import React, { useEffect } from "react";
import StockGroupToNego from "../common/StockGroupToNego";
import InputQuantityCommon from "../common/InputQuantityCommon";
import LabelGreen from "../common/LabelGreen";
import LabelGray from "../common/LabelGray";
import ButtonTextSec from "../common/ButtonTextSec";
import { useUser } from "@/contexts/userContex";
import StockMovementHook from "@/hooks/useMovementsHook";
import useUserHook from "@/hooks/useUserHook";
import StockMovementBySymbol from "@/utils/fillStockMovementBySymbol";
import { FormProvider, useForm } from "react-hook-form";
import { MovementsEntries } from "@/types/interfacesModel";
import updateMovement from "@/services/updateMovement";
import updateMovementEntry from "@/services/updateMovementEntry";
import buyingPowerAjust from "@/utils/buyingPowerAjust";
import DatePickerSell from "../common/DatePickerSell";
import StockPriceInput from "../common/StockPriceInput";

interface propsForm {
  props: {
    symbol: string;
  };
}

interface formStructure {
  sharesQuantity: number;
  movSelected: MovementsEntries;
  purchaseDate:Date;
  stockPrice: string;
}

export default function FormNegotiationSell({ props }: propsForm) {
  const { user } = useUser();
  const { stockMovements, loading } = StockMovementHook(user?.id ?? "");
  const { profile } = useUserHook(user?.id ?? null);
  const filtredMovements = new StockMovementBySymbol(
    stockMovements?.allPosition ?? [],
    props.symbol
  );
 

  //inicializamos methods
  const methods = useForm<formStructure>();
  const { handleSubmit} = methods;

  const onSubmit = async (data: formStructure) => {
    try {
      console.log(data);
      
        const totalSell = data.sharesQuantity * Number(data.stockPrice);
        console.log("totalSell", totalSell);
      
      const idMov = filtredMovements.getFilteredMovements[0]._id;
      const idEntry = data.movSelected._id;
      const ammount = data.sharesQuantity * Number(data.stockPrice);
      if (data.movSelected.sharesQuantity == data.sharesQuantity) {
        //usar update movement

        if (idMov && idEntry) {
          const updateMov = await updateMovementEntry(idMov, idEntry, {
            ...data.movSelected,
            movementType: "sell",
            closingPrice: Number(data.stockPrice),
            closeDate: data.purchaseDate,
          });


        
            if(user?.id && profile?.buyingPower){
              const bpAjust = await buyingPowerAjust(user?.id, profile?.buyingPower,ammount, "add");
              console.log("BuyingPower", bpAjust);
            }
           

          console.log(updateMov);
        }
      } else if (data.movSelected.sharesQuantity != data.sharesQuantity) {
        //usar update movement entry

        if (idMov && idEntry) {
          const updateMov = await updateMovementEntry(idMov, idEntry, {
            ...data.movSelected,
            sharesQuantity:
              data.movSelected.sharesQuantity - data.sharesQuantity,
          });
          console.log(updateMov);

          // sumo el monto vendido a mi buying power

          //creo una particion
          const movEntri: MovementsEntries = {
            openDate: new Date(data.movSelected.openDate),
            openingPrice: Number(data.movSelected.openingPrice),
            movementType: "sell",
            sharesQuantity: Number(data.sharesQuantity),
            closingPrice: Number(data.stockPrice),
            closeDate: data.purchaseDate,
          };

          const movement = { movement: movEntri };

          const newPartEntry = await updateMovement(idMov, movement);

          console.log("newPartEntry",newPartEntry);

          
            if(user?.id && profile?.buyingPower){
              const bpAjust = await buyingPowerAjust(user?.id, profile?.buyingPower,ammount, "add");
              console.log("BuyingPower", bpAjust);
            }
           
          
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="flex flex-col max-w-md mx-auto items-center justify-center p-6 gap-6">
      <FormProvider {...methods}>
        <form className="flex flex-col gap-7" onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full">
            {filtredMovements.checkSize() > 0 && (
              <StockGroupToNego
                props={{ data: filtredMovements.getFilteredMovements[0] }}
              />
            )}
          </div>
          <div className="flex w-full">
            <DatePickerSell />
          </div>
          <StockPriceInput props={{ symbol: props.symbol }} /> 
          <div className="w-full">
            <InputQuantityCommon />
          </div>
          <section className="flex items-center gap-2 w-full">
            <LabelGray params={{ text: "Sell Amount:" }} />
            <LabelGreen params={{ text: `$ 400.50` }} />
          </section>
          <footer className="w-full flex justify-center p-4">
            <ButtonTextSec params={{ text: "Vender", type: "submit" }} />
          </footer>
        </form>
      </FormProvider>
    </main>
  );
}
