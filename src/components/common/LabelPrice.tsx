import React from "react";

interface LabelPriceParams {
    params: {
       text: string;
    }
}

export default function LabelPrice( {params}: LabelPriceParams ){
  return(
    <span className="text-customOrange_dark font-bold ml-4" >
        $ {params.text}
    </span>
  )
}
