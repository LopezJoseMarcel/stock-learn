import React, { useState } from "react";
import Image from "next/image";
import ButtonText from "../common/ButtonText";
import { useRouter } from "next/navigation";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

export default function InfoPage() {

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  return (
    <div>
      <section className="flex flex-col items-center justify-center p-4 gap-14">
        <Image
          src="/icon-01.svg"
          alt="Mi imagen"
          width={100}
          height={100}
          quality={85}
        />
        <span className="text-lg text-center font-thin text-gray-500">
          ¡Aprende de los mercados sin arriesgar tu dinero! Nuestro simulador te
          permite experimentar con inversiones pasadas y presentes.
        </span>
        <Image
          src="/lion.svg"
          alt="Mi imagen"
          width={250}
          height={250}
          quality={85}
        />
        <section>
          <ButtonText
            params={{
              text: "Comenzar",
              type: "button",
              onClick() {
                setIsLoading(true);
                setTimeout(()=>{router.push("/login"); }, 1000);
              },
            }}
            
          />
        </section>
        <Backdrop
          sx={(theme) => ({ color: '#ff9d23', zIndex: theme.zIndex.drawer + 1 })}
          open={isLoading}
          >
          <CircularProgress color="inherit" />
        </Backdrop>
      </section>
    </div>
  );
}
