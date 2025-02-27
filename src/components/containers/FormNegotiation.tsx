"use client"
import React from "react";
import ButtonGroupOperation from "../common/ButtonGroupOperation";
import ButtonGroOperDetails from "../common/ButtonGroOperDetails";
import DataPicker from "../common/DataPicker";
import InputAmount from "../common/InputAmount";


export default function FormNegotiation() {
  return (
    <>
     <main className="flex flex-col items-center justify-center">
       <ButtonGroupOperation/>
       <ButtonGroOperDetails/>
       <DataPicker/>
       <InputAmount/>
     </main>
    </>
  );
}