import React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

export default function ButtonGroupOperation() {

  return (
    <>
      <FormControl>
            <FormLabel
              sx={{
                color: "#666666",
                fontWeight: "Bold",
                "&.Mui-focused": { color: "#16c47f" },
              }}
              id="demo-row-radio-buttons-group-label"
            >
              Operation Type
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel
                sx={{ color: "#666666", fontWeight: "medium" }}
                value="buy"
                control={
                  <Radio
                    sx={{
                      color: "#ff9d23",
                      "&.Mui-checked": { color: "#ff9d23" },
                    }}
                  />
                }
                label="Buy"
              />
              <FormControlLabel
                sx={{ color: "#666666" }}
                value="sale"
                control={
                  <Radio
                    sx={{
                      color: "#ff9d23",
                      "&.Mui-checked": { color: "#ff9d23" },
                    }}
                  />
                }
                label="Sale"
              />
            </RadioGroup>
          </FormControl>
    </>
  );
}
