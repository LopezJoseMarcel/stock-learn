import mongoose from "mongoose";

 export interface StockMovement {
  user_id: mongoose.Schema.Types.ObjectId;
  symbol: string;
  sharesQuantityTotal: number;
  averageOpeningPrice: number;
  profitLossTotal: number;
  movements: {
    movementType: "sell" | "buy";
    sharesQuantity: number;
    openingPrice: number;
    closingPrice: number;
    profitLoss: number;
    openDate: Date;
    closeDate:Date;
  }[];
}

export interface Stock {
  meta: {
    symbol: string;
    interval: string;
    currency: string;
    exchange_timezone: string;
    exchange: string;
    mic_code: string;
    type: string;
  };
  value: {
    datetime: string;
    open: string;
    high: string;
    low: string;
    close: string;
    volume: string;
  };
}

export interface UserModelInterface {
    userName : string;
    email: string;
    password: string;
    movements: mongoose.Schema.Types.ObjectId[];
    buyingPower: number;
}


