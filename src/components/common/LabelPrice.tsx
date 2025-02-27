import React from "react";

interface LabelPriceParams {
    params: {
       text: string;
    }
}

export default function LabelPrice( {params}: LabelPriceParams ){
  return(
    <span className="text-customGreen_dark font-bold" >
        $ {params.text}
    </span>
  )
}
