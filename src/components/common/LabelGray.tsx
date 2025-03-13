import React from "react";

interface LabelPriceParams {
    params: {
       text: string;
    }
}

export default function LabelGray( {params}: LabelPriceParams ){
  return(
    <span className="text-customGrey_dark font-bold" >
        {params.text}
    </span>
  )
}
