import mongoose from "mongoose";
import { StockMovement } from "@/types/interfacesModel"

const StockMovementSchema = new mongoose.Schema<StockMovement>({
  _id: { type: mongoose.Schema.Types.ObjectId, auto:true },
  user_id: {type: mongoose.Schema.Types.ObjectId, required: true},
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
      _id: { type: mongoose.Schema.Types.ObjectId, auto: true},
    },
  ],
});

export default mongoose.models.StockMovement ||  mongoose.model("StockMovement", StockMovementSchema,"StockMovement");