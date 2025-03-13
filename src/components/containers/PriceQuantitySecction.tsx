import React from "react";
import TextField from "@mui/material/TextField";
import { useFormContext, Controller } from "react-hook-form";

export default function PriceQuantitySecction() {
  
  const { control } = useFormContext();

  return (
      <div>
        <Controller 
         name="sharesQuantity"
         rules={{required: "No puede estar vacio"}}
         control={control}
         defaultValue={0}
         render={({field}) => (
          <TextField
          {...field}
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
        /> 
         )}
        >
        </Controller>
        
      </div>
  );
}
