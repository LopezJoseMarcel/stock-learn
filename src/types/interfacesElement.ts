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
  disabled?: boolean;
}

export interface useCapitalsHookProps {
  capital: number;
  grandTotOpenPrice: number;  
  profitsLosses: number;
}

export interface ButtonProps {
  type: "submit" | "reset" | "button" | undefined;
  label?: string;
  onClick: () => void;
}

export interface IconButton extends ButtonProps {
  icon: React.ReactNode;
}

export interface CabeceraStockProps{
  symbol: string;
}






