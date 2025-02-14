import React from "react";
import { ButtonTextProps } from "@/types/interfacesElement";


interface buttonProps {
  params: ButtonTextProps;   
}

export default function ButtonText({ params }: buttonProps) {

  
  return (
    <button type={ params.type } onClick={ params.onClick }
    className={`bg-customGreen_dark hover:bg-customGreen_to_dark text-white font-bold py-2 px-4 rounded-3xl`}>
      { params.text}
    </button>
  );
}

