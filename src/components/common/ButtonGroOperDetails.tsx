import React from "react";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function ButtonGroOperDetails() {
  return (
    <>
    <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">Transaction Details</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        <FormControlLabel  value="stocks" control={<Radio  sx={{ color: "#ff9d23", "&.Mui-checked": { color: "#ff9d23" } }} />} label="Stocks" />
        <FormControlLabel value="amount" control={<Radio sx={{ color: "#ff9d23", "&.Mui-checked": { color: "#ff9d23" } }} />} label="USD Amount" />
      </RadioGroup>
    </FormControl>
    </>
  );
}