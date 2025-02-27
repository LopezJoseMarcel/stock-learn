import React from "react";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function ButtonGroupOperation() {
  return (
    <>
    <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">Operation Type</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        <FormControlLabel value="buy" control={<Radio />} label="Buy" />
        <FormControlLabel value="sale" control={<Radio />} label="Sale" />
      </RadioGroup>
    </FormControl>
    </>
  );
}