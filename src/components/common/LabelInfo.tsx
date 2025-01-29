import React from "react";
import { LabelInfoInterface } from "@/types/interfacesElement";

interface paramsInterface {
    params: LabelInfoInterface
}

export default function LabelInfo( {params} : paramsInterface  ) {
  return (
    <div className="flex flex-col items-center my-2 ">
      <span className="text-customGrey_dark font-bold">{params.titleText} </span>
      <hr className="my-1 w-1/2 border-gray-300 border-t-2" />
      <span className="text-customGrey_dark font-bold">{params.titleMoney}</span>
    </div>
  );
}
