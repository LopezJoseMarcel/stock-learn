import mongoose from "mongoose";

export interface StockModelInfo {
  symbol :  string ;
  logo_url: string;
}

export interface MovementsEntries {
    movementType: "sell" | "buy";
    sharesQuantity: number;
    openingPrice: number;
    closingPrice: number;
    profitLoss: number;
    openDate: Date;
    closeDate:Date;
}


 export interface StockMovement {
  user_id: mongoose.Schema.Types.ObjectId;
  symbol: string;
  sharesQuantityTotal: number;
  averageOpeningPrice: number;
  profitLossTotal: number;
  movements: MovementsEntries[]
  lastPrice: number;
  openSharesTotal:number;
  closeSharesTotal:number;
}
export interface StockMovementHook  {
  openPosition: StockMovement[];
  closePosition: StockMovement[];
}

export interface Stock {
  logoUrl?: string;
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
    movements?: mongoose.Schema.Types.ObjectId[];
    buyingPower: number;
}


