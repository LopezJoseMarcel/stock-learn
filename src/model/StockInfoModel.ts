import mongoose from  "mongoose" ;

interface StockModelInfo {
   symbol :  string ;
   logo_url: string;
}

const StockInfoSchema = new mongoose.Schema<StockModelInfo>({
    symbol :  {type: String} ,
    logo_url: {type: String},
});


export default mongoose.models.StockInfo || mongoose.model("StockInfo",StockInfoSchema,"StockInfo");


