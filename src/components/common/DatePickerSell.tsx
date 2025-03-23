"use client";

import { Controller, useFormContext } from "react-hook-form";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs"; // Para manejar fechas

export default function DatePickerSell() {
  const { control } = useFormContext(); // Obtener contexto de React Hook Form

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["MobileDatePicker"]}>
        <Controller
          name="purchaseDate"
          control={control}
          defaultValue={new Date()} // Inicialmente vacío
          rules={{ required: "La fecha es obligatoria" }} // Validación
          render={({ field, fieldState }) => (
            <MobileDatePicker
              
              {...field}
              label="Purchase Date"
              disableFuture
              value={field.value ? dayjs(field.value) : null} // Convertir a dayjs
              onChange={(date) => field.onChange(date ? date.toISOString() : null)} // Convertir a ISO
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "#ff9d23", //borde al seleccionar
                  },
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#ff9d23", //label al seleccionar
                },
              }}
              slotProps={{
                textField: {
                  error: !!fieldState.error,
                  helperText: fieldState.error?.message,
                },
              }}
            />
          )}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
