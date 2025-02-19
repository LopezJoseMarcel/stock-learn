import mongoose from  "mongoose" ;
import { StockModelInfo } from "@/types/interfacesModel";

const StockInfoSchema = new mongoose.Schema<StockModelInfo>({
    symbol :  {type: String} ,
    logo_url: {type: String},
});


export default mongoose.models.StockInfo || mongoose.model("StockInfo",StockInfoSchema,"StockInfo");


