"use client";
import React, { useEffect, useState } from "react";
import LabelInfo from "@/components/common/LabelInfo";
import { useUser } from "@/contexts/userContex";
import useUserHook from "@/hooks/useUserHook";
import useCapitalsHook from "@/hooks/useCapitalsHook";
import { CircularProgress } from "@mui/material";
import ButtonTextSec from "../common/ButtonTextSec";
import useMovementHook from "@/hooks/useMovementsHook";
import TableMovements from "../common/TableMovements";
import { CgMenuRound } from "react-icons/cg";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Backdrop } from "@mui/material";

function DashboardPage() {
  const router = useRouter();

  const { user } = useUser();
  const { profile } = useUserHook(user?.id ?? "");
  const { capital, loading: loadingCapital } = useCapitalsHook(
    user?.id,
    profile?.buyingPower ?? null
  );
  const { stockMovements, loading } = useMovementHook(user?.id ?? "");
  const [naviLoading, setNaviLoading] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="bg-white">
        <section className="relative">
          <div className="absolute top-2 left-2">
            <CgMenuRound size={"40px"} color="#666666" />
          </div>
        </section>
        <div className="container  mx-auto px-4 py-7 flex flex-col items-center ">
          {loadingCapital || capital === null ? (
            <CircularProgress color="success" />
          ) : (
            <>
              <LabelInfo
                params={{
                  titleMoney: `USD ${
                    capital?.capital ? capital.capital.toFixed(2) : 0
                  }`,
                  titleText: "CAPITAL",
                }}
              />
              <LabelInfo
                params={{
                  titleMoney: `USD ${
                    capital?.profitsLosses
                      ? capital.profitsLosses.toFixed(2)
                      : 0
                  }`,
                  titleText: "PROFITS/LOSSES",
                }}
              />
              <LabelInfo
                params={{
                  titleMoney: `USD ${
                    profile?.buyingPower
                      ? profile?.buyingPower.toFixed(2)
                      : 0
                  }`,
                  titleText: "BUYING POWER",
                }}
              />
            </>
          )}
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8 bg-customGreen_to_light rounded-t-3xl rounded-b-none">
        <div className="flex flex-col gap-4 items-center">
          {!stockMovements && loading ? (
            <CircularProgress color="success" />
          ) : (
            <>
              {stockMovements && (
                <TableMovements
                  params={{
                    tableHeaders: [
                      "Symbol",
                      "Quantity",
                      "Open Date",
                      "Last Price",
                    ],
                    data: stockMovements.openPosition,
                    tableTitle: "Operaciones Abiertas",
                  }}
                />
              )}
              {stockMovements && (
                <TableMovements
                  params={{
                    tableHeaders: [
                      "Symbol",
                      "Quantity",
                      "Open Date",
                      "Last Price",
                    ],
                    data: stockMovements.closePosition,
                    tableTitle: "Operaciones Cerradas",
                  }}
                />
              )}
            </>
          )}
          {!stockMovements && !loading && (
            <>
              <Image
                src="/lobo.svg"
                alt="Mi imagen"
                width={250}
                height={250}
                quality={85}
              />
              <span className="text-lg text-center font-bold text-black">
                You don't have any stock!
              </span>
            </>
          )}
        </div>

        <div className="fixed bottom-0  p-4 ">
          <div className="fixed bottom-0 left-0 right-0  p-4 flex justify-center">
            <ButtonTextSec
              params={{
                onClick: () => {
                  setNaviLoading(true);
                  router.push("/searchStock");
                },
                text: "Buscar",
                type: "button",
              }}
            />
          </div>
        </div>
        <Backdrop
          sx={(theme) => ({
            color: "#ff9d23",
            zIndex: theme.zIndex.drawer + 1,
          })}
          open={naviLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      </main>
    </div>
  );
}

export default DashboardPage;
