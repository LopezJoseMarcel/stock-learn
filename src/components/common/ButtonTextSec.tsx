import React from "react";
import { ButtonTextProps } from "@/types/interfacesElement";


interface buttonProps {
  params: ButtonTextProps;   
}

export default function ButtonTextSec({ params }: buttonProps) {

  
  return (
    <button type={ params.type } onClick={ params.onClick }
    className={`bg-customOrange_dark hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-3xl`}>
      { params.text}
    </button>
  );
}

