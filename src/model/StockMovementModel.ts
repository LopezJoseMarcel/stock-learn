import mongoose from "mongoose";

interface StockMovement {
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

const StockMovementSchema = new mongoose.Schema<StockMovement>({
  user_id: {type: mongoose.Schema.Types.ObjectId},
  symbol: { type: String, required: true }, // Consider making symbol required
  sharesQuantityTotal: { type: Number },
  averageOpeningPrice: { type: Number },
  profitLossTotal: { type: Number },
  movements: [
    {
      movementType: { type: String, enum: ["sell", "buy"], required: true }, 
      sharesQuantity: { type: Number, required: true },
      openingPrice: { type: Number, required: true },
      closingPrice: { type: Number },
      profitLoss: { type: Number},
      openDate: {type: Date},
      closeDate: { type: Date},
    },
  ],
});

export default mongoose.models.StockMovement ||  mongoose.model("StockMovement", StockMovementSchema,"StockMovement");