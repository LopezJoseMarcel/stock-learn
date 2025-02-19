import { IconButton } from "@/types/interfacesElement";
import React from "react";

interface IconButtonProps {
  params: IconButton;
}

export default function ButtonIcon({ params }: IconButtonProps) {
  return (
    <>
      <button
        type={params.type}
        onClick={params.onClick}
      >
        {params.label}
        <span className="sm:block">{params.icon}</span>
      </button>
    </>
  );
}
