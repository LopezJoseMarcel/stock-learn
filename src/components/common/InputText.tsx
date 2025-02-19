import React from "react";
import TextField from "@mui/material/TextField";

interface InputTextProps {
  params: {
    label: string;
    register?: any;  // Para `react-hook-form`
  };
}

export default function InputText({ params }: InputTextProps) {
  return (
    <TextField
      id="outlined-basic"
      label={params.label}
      variant="outlined"
      {...params.register}  // <-- Conectar con react-hook-form
      sx={{
        "& label.Mui-focused": { color: "#666666" },
        "& .MuiOutlinedInput-root": {
          "& fieldset": { borderColor: "#666666" },
          "&:hover fieldset": { borderColor: "#a8a8a8" },
          "&.Mui-focused fieldset": { borderColor: "#666666" },
        },
      }}
    />
  );
}
