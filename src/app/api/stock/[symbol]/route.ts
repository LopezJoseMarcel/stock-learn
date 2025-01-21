import { NextResponse } from "next/server";
import { dbConnection } from "@/utils/dbConnection";
import StockModel from "@/model/StockModel";
import axios from "axios";
import { format, parse, addMonth } from "@formkit/tempo";
import StockInfoModel from "@/model/StockInfoModel";
import getAvailbleDate from "@/utils/getAvailableDate";



interface paramsInterface {
  params: Promise<{ symbol: string }>
}

const today = new Date();



export async function POST(
  request: Request,
  { params }:  paramsInterface
): Promise<NextResponse> {
  dbConnection();

  try {
    const { symbol } = await params;
   
    const stocksBd = await StockModel.find({"meta.symbol": symbol})
    .sort({"value.datetime":-1})
    .exec();

    
    const LastDateStock = stocksBd[0].value.datetime;
    

    let newDate = parse(LastDateStock,"YYYY-MM-DD", "en-US" );
    newDate = addMonth(newDate,1);
    const dateString: string = format(newDate, "YYYY-MM-DD", "en")
    
  
    const { data } = await axios.get("https://api.twelvedata.com/time_series", {
      params: {
        outputsize: 5000,
        symbol: symbol,
        interval: "1month",
        apikey: "5f0e8058387445ba9082ecd23b8f3cf3",
        end_date:  `${today.getFullYear()}-12-31`,
        start_date: stocksBd.length > 0 ? dateString :  "",
      },
    });

    let registrosInsertados: number = 0;
    let message: string = "" ;

    if (data.status === "ok") {
      const insertsArray = data.values.map((registro: any) => ({
      meta: {
        ...data.meta,
      },
      value: {
        ...registro,
      },
    }));

    const stocksInsert = await StockModel.insertMany(insertsArray);

    registrosInsertados = stocksInsert.length;
    
    }
  
    //seccion para traer url del logo de la Stock

    const stockInfo = await StockInfoModel.find({"symbol": symbol});

    if(stockInfo.length == 0){
      const logoUrl  = await axios.get("https://api.twelvedata.com/logo",{
        params: {
          symbol: symbol, 
          apikey: "5f0e8058387445ba9082ecd23b8f3cf3",
        }
      });

      
      if (logoUrl.data.status === "error") {
        message = `Error logo: ${logoUrl.data.message}` ;
      }else{
        const logoInsert = await new StockInfoModel({
          symbol,
          logo_url: logoUrl.data.url,
        })

        const savedLogoInsert = await logoInsert.save();

        message = "Logo Insertado";

      }
    }else{
      message = `Ya existe la info del symbol: ${symbol}`;
    }
    return NextResponse.json({ message: `Insertados: ${registrosInsertados}`, logo: message, "Date": getAvailbleDate()  });
    
  } catch (error: any) {
    return NextResponse.json(
      { message: `Error al insertar: ${error.message}` },
      { status: 500 }
    );
  }
}
