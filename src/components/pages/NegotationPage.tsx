"use client";
import React, { useState } from "react";
import FormNegotiationBuy from "../containers/FormNegotiationBuy";
import ButtonGroupOperation from "../common/ButtonGroupOperation";
import ButtonGoBack from "../common/ButtonGoBack";
import FormNegotiationSell from "../containers/FormNegotiationSell";

interface StockPriceInputProps {
  props: {
    symbol: string;
  };
}

export default function NegotationPage({ props }: StockPriceInputProps) {
  const [form, setForm] = useState<"sale" | "buy">("buy");

  return (
    <main>
      <div className=" w-full flex flex-start m-3">
        <ButtonGoBack />
      </div>
      <section className="w-full flex justify-center">
        <ButtonGroupOperation onChange={(value: "sale" | "buy") => setForm(value)} selectedForm={form}/>
      </section>
   
      {form === "buy" && (
        <FormNegotiationBuy props={{ symbol: props.symbol }} />
      )}
      {form === "sale" && (
       <FormNegotiationSell props={{symbol: props.symbol}} />
      )}
    </main>
  );
}
