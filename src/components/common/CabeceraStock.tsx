'use client'
import Image from "next/image";
import ButtonIcon from "./ButtonIcon";
import { FaRegStar } from "react-icons/fa6";
import { FaStar } from "react-icons/fa6";


export default function CabeceraStock( ) {
  return (
    <header className="bg-white flex justify-between p-4">
      <div className="flex flex-col gap-2">
        <Image
          src={"https://api.twelvedata.com/logo/apple.com"}
          alt="stock"
          width={30}
          height={30}
          quality={85}
          className="object-contain"
        />
        <span className="text-customGrey_dark font-thin">
         Apple.inc
        </span>
      </div>
      <ButtonIcon 
        params={
            {
              icon: <FaRegStar size={30} color="#a8a8a8"/>,
              type: "button",
              onClick: () => console.log("Button clicked")
            }
        }
      />
    </header>
  );
}
