import mongoose from "mongoose";

export interface StockModelInfo {
  symbol :  string ;
  logo_url: string;
}

export interface MovementsEntries {
    movementType: "sell" | "buy";
    sharesQuantity: number;
    openingPrice: number;
    closingPrice?: number;
    profitLoss?: number;
    openDate: Date;
    closeDate?:Date;
    _id?: string;

}

 export interface StockMovement {
  _id?: string;
  user_id: string;
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
  allPosition:StockMovement[];
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

export interface UserModelUpdate{
  userName? : string;
  email?: string;
  password?: string;
  movements?: mongoose.Schema.Types.ObjectId[];
  buyingPower?: number;
}




