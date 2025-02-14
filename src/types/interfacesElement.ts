export interface LabelInfoInterface {
    titleText: string,
    titleMoney: string
}

export interface LoginFormInputs {
    email: string;
    password: string;
}

export interface ButtonTextProps {
  text: string;
  type: "button" | "submit" | "reset";
  onClick?: () => void;
  onChange?: () => void;
}

export interface useCapitalsHookProps {
  capital: number;
  grandTotOpenPrice: number;  
  profitsLosses: number;
}





