"use client"
import React from "react";
import FormNegotiationBuy from "../containers/FormNegotiationBuy";
import ButtonGroupOperation from "../common/ButtonGroupOperation";
import ButtonGoBack from "../common/ButtonGoBack";

interface StockPriceInputProps {
  props: {
    symbol: string;
  };
}

export default function NegotationPage({ props }: StockPriceInputProps) {
  return (
    <main>
      <div className=" w-full flex flex-start m-3">
        <ButtonGoBack />
      </div>
      <>
      <ButtonGroupOperation/>
      </>
      <FormNegotiationBuy props={{ symbol: props.symbol }} />
    </main>
  );
}
