import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useFormContext } from "react-hook-form";
import getStockByDate from "@/services/getStockByDate";

interface StockPriceInputProps {
  props: {
    symbol: string;
  };
}

export default function StockPriceInput({ props }: StockPriceInputProps) {
  const { watch, setValue } = useFormContext();
  const selectedDate = watch("purchaseDate"); //purchaseDate es el nombre del datePicker

  useEffect(() => {
    if (!selectedDate) return; //si no existe la fecha no hace nada

    const fetchData = async () => {
      try {
        const stock = await getStockByDate(props.symbol, selectedDate);
        setValue("stockPrice",Number(stock.value.close).toFixed(2));
        

      } catch (error) {
        console.error("Error fetching stock price:", error);
      }
    };

    fetchData();
  }, [selectedDate, setValue]);

  return (
    
      <div>
        <TextField
        required
          sx={{
            "& .MuiOutlinedInput-root": {
              "&.Mui-focused fieldset": { borderColor: "#ff9d23" },
            },
            "& .MuiInputLabel-root.Mui-focused": { color: "#ff9d23" },
          }}
          label="Stock Price"
          type="number"
          variant="outlined"
          value={watch("stockPrice") || ""}
        />
      </div>
    
  );
}
