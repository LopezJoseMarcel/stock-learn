import React from "react";
import TextField from "@mui/material/TextField";
import { useFormContext } from "react-hook-form";

export default function InputQuantityCommon() {
  const { watch, setValue } = useFormContext();
  const selectedPosQuant = watch("sharesQuantity");

  return (
    <TextField
      focused
      required
      sx={{
        "& .MuiOutlinedInput-root": {
          "&.Mui-focused fieldset": { borderColor: "#ff9d23" },
        },
        "& .MuiInputLabel-root.Mui-focused": { color: "#ff9d23" },
      }}
      label="Shares Quantity"
      type="number"
      variant="outlined"
      onChange={(e) => {
        const newValue = e.target.value;
        setValue("sharesQuantity", newValue === "" ? "" : Number(newValue), {
          shouldValidate: true, // Para validar en tiempo real
          shouldDirty: true, // Marcar como cambiado
        });
      }}
      value={selectedPosQuant === undefined ? "" : selectedPosQuant} // Permitir valor vacío
    />
  );
}
