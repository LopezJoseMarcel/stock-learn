import mongoose from "mongoose";

interface Stock {
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

const StockSchema = new mongoose.Schema<Stock>({
    meta: {
      symbol:{
        type: String
      } ,
      interval: {
        type: String
      },
      currency: {
        type: String
      },
      exchange_timezone: {
        type: String
      },
      exchange: {
        type: String
      },
      mic_code: {
        type: String
      },
      type:{
        type:String
      }
    },
    value: {
      datetime: { type:String },
      open: { type:String },
      high: { type:String },
      low:  { type:String },
      close: { type:String },
      volume: { type:String },
    }
  });
  
export default mongoose.models.Stock || mongoose.model("Stock",StockSchema,"Stock");
