"use client";
import React from "react";
import ButtonIcon from "../common/ButtonIcon";
import { FaArrowCircleLeft } from "react-icons/fa";
import ButtonTextSquare from "../common/ButtonTextSquare";
import InputText from "@/components/common/InputText";
import { useFormContext } from "react-hook-form";
import { Backdrop, CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";

interface SearchStockParams {
  onSubmit: (data: { query: string }) => void;
  loading: boolean;
}

interface FormData {
  query: string;
}

export default function SearchStockSection({
  onSubmit,
  loading,
}: SearchStockParams) {
  const { register, handleSubmit } = useFormContext<FormData>();

  const router = useRouter();

  return (
    <>
      <div className="absolute top-3 left-3">
        <ButtonIcon
          params={{
            icon: <FaArrowCircleLeft size={25} color="#666666" />,
            type: "button",
            onClick: () => {router.push("/dashboard")}
          }}
        />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex mt-12 w-full gap-4">
          <InputText
            params={{
              label: "Acciones",
              register: register("query", { required: true }),
            }}
          />
          <ButtonTextSquare
            params={{ type: "submit", text: "Buscar", disabled: loading }}
          />
          <Backdrop
            sx={(theme) => ({
              color: "#ff9d23",
              zIndex: theme.zIndex.drawer + 1,
            })}
            open={loading}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </div>
      </form>
    </>
  );
}
