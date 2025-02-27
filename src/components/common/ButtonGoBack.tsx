import React from "react";
import { useRouter } from "next/navigation";
import ButtonIcon from "./ButtonIcon";
import { FaArrowCircleLeft } from "react-icons/fa";


  
export default function ButtonGoBack( ) {

  const router = useRouter();

  return (
    <ButtonIcon
      params={{
        icon: <FaArrowCircleLeft size={25} color="#666666" />,
        type: "button",
        onClick: () => {
          router.back();
        },
      }}
    />
  );
}
