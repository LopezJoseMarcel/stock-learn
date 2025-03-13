"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";

interface propsDialog {
  props: {
    message: string;
    buttonText: string;
    onClick : () => void;
    open: boolean;
  }
}

export default function DialogCommon( {props} : propsDialog  ) {

  return (
    <React.Fragment>
      <Dialog
        open={props.open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {props.message}
        </DialogTitle>
        <DialogActions>
            <Button onClick={props.onClick} autoFocus>
              {props.buttonText}
            </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
