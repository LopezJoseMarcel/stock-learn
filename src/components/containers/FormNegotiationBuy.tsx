"use client";
import React, { useState, useEffect } from "react";
import DatePicker from "../common/DatePicker";
import PriceQuantitySecction from "./PriceQuantitySecction";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import StockPriceInput from "../common/StockPriceInput";
import ButtonTextSec from "../common/ButtonTextSec";
import Divider from "@mui/material/Divider";
import LabelGreen from "../common/LabelGreen";
import { useUser } from "@/contexts/userContex";
import StockMovementHook from "@/hooks/useMovementsHook";
import StockMovementBySymbol from "@/utils/fillStockMovementBySymbol";
import { MovementsEntries } from "@/types/interfacesModel";
import updateMovement from "@/services/updateMovement";
import useUserHook from "@/hooks/useUserHook";
import LabelGray from "../common/LabelGray";
import Alert from "@mui/material/Alert";
import { Stack } from "@mui/material";
import buyingPowerAjust from "@/utils/buyingPowerAjust";
import newStockMovementService from "@/services/newStockMovementService";
import DialogCommon from "../common/DialogCommon";
import { useRouter } from "next/navigation";

interface StockPriceInputProps {
  props: {
    symbol: string;
  };
}

export default function FormNegotiationBuy({ props }: StockPriceInputProps) {
  const [transAvailable, setTransAvailable] = useState<boolean>(true);
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const { user } = useUser();
  const { stockMovements, loading } = StockMovementHook(user?.id ?? "");
  const { profile } = useUserHook(user?.id ?? null);
  const filtredMovements = new StockMovementBySymbol(
    stockMovements?.allPosition ?? [],
    props.symbol
  );

  const router = useRouter();

  const methods = useForm(); //Configurar React Hook Form
  const { handleSubmit, watch, setValue } = methods;

  //valores de los inpust
  const sharesQuantity = watch("sharesQuantity", 0);
  const stockPrice = watch("stockPrice", 0);
  // Calcular el total
  const total = (stockPrice * sharesQuantity).toFixed(2);
  setValue("total", total);

  const handleSuccess = async () => {
    router.push(`/dashboard`);
  };

  useEffect(() => {
    if (Number(total) > (profile?.buyingPower ?? 0)) {
      setTransAvailable(false);
    } else {
      setTransAvailable(true);
    }
  }, [total]);

  const onSubmit = async (data: any) => {
    try {
      console.log("data", data);
      if (filtredMovements.checkSize() > 0) {
        const stockMovement = filtredMovements.getFilteredMovements[0];
        const movId = stockMovement._id ?? "";

        const movEntri: MovementsEntries = {
          openDate: new Date(data.purchaseDate),
          openingPrice: Number(data.stockPrice),
          movementType: "buy",
          sharesQuantity: Number(data.sharesQuantity),
        };

        const movement = { movement: movEntri };

        const update = await updateMovement(movId, movement);
        if (update._id === movId) {
          console.log("Movement añadido:", update);
          const updateBP = async () => {
            if (user?.id) {
              const ajustBP = await buyingPowerAjust(
                user.id,
                profile?.buyingPower ?? 0,
                Number(total),
                "cut"
              );
              console.log("ajustBP", ajustBP);
              setOpenDialog(true);
            }
          };
          await updateBP();
        }
      } else {
        const movEntri: MovementsEntries = {
          openDate: new Date(data.purchaseDate),
          openingPrice: Number(data.stockPrice),
          movementType: "buy",
          sharesQuantity: Number(data.sharesQuantity),
        };

        const stockMovement = {
          user_id: user?.id ?? "",
          symbol: props.symbol,
          movements: [movEntri],
        };

        const makeNewEntry = async () => {
          const newMov = await newStockMovementService(stockMovement);
          if (newMov._id) {
            console.log("Movimiento Añadido");
            const updateBP = async () => {
              if (user?.id) {
                const ajustBP = await buyingPowerAjust(
                  user.id,
                  profile?.buyingPower ?? 0,
                  Number(total),
                  "cut"
                );
                console.log("ajustBP", ajustBP);
                setOpenDialog(true);
              }
            };
            await updateBP();
          }
        };

        makeNewEntry();
      }
    } catch (error) {
      console.log("Submit Error", error);
    }
  };
  return (
    <>
      <main className="flex flex-col w-9/10 items-center justify-center p-4 gap-4">
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <DatePicker />
            <StockPriceInput props={{ symbol: props.symbol }} />
            <PriceQuantitySecction />
            <LabelGray params={{ text: `Total: $ ${total}` }} />
            <Divider />
            <>
              <LabelGreen
                params={{
                  text: `Buying Power: $ ${
                    profile?.buyingPower.toFixed(2) ?? 0
                  }`,
                }}
              />
            </>

            <ButtonTextSec
              params={{
                type: "submit",
                text: "Confirmar",
                onClick: handleSubmit(onSubmit),
                disabled: !transAvailable,
              }}
            />
          </form>
        </FormProvider>
        {!transAvailable && (
          <Stack sx={{ maxWidth: "340px", width: "100%" }} spacing={2}>
            <Alert severity="warning">
              The total exceeds your purchasing power.
            </Alert>
          </Stack>
        )}
        <DialogCommon
          props={{
            buttonText: "Acept",
            message: "Stock purchased successfully!!",
            open: openDialog,
            onClick: handleSuccess,
          }}
        />
      </main>
    </>
  );
}
