import { NextResponse } from "next/server";
import { dbConnection } from "@/utils/dbConnection";
import StockModel from "@/model/StockModel";
import StockInfoModel from "@/model/StockInfoModel";
import axios from "axios";
import getAvailbleDate from "@/utils/getAvailableDate";


interface paramsInterface {
  params: Promise<{ symbol: string }>
}

const today = new Date();

export async function GET(request: Request, { params }: paramsInterface): Promise<NextResponse> {
  dbConnection();

  try {
    const { symbol } = await params;

    //traer el logo 
    const stockinfo = await StockInfoModel.findOne({symbol : symbol}).exec();
    const urlLogo = stockinfo?.logo_url || "";
    //end traer el logo

    const lastStocKPrice = await StockModel
    .find({
      "meta.symbol": symbol,
      "value.datetime":{$gte: getAvailbleDate()},
    })
    .sort({ "value.datetime": -1 })
    .exec();

    if (lastStocKPrice.length == 0) {
      const { data } = await axios.get("https://api.twelvedata.com/time_series", {
        params: {
          outputsize: 10,
          symbol: symbol,
          interval: "1day",
          apikey: "5f0e8058387445ba9082ecd23b8f3cf3",
          start_date: getAvailbleDate(),
        },
      });

      if(data.status === "ok"){
        const todayStockPrice = new StockModel({
         meta: data.meta,
         value: data.values[0],
        });
        
        const savedtodayStockPrice = await todayStockPrice.save()

        return NextResponse.json({"data": savedtodayStockPrice});

      }else{
        return NextResponse.json(
          { message: `Error al traer las acciones de twelvedata` },
          { status: 500 }
        );
      }

    }

    return NextResponse.json({"data": lastStocKPrice[0], urlLogo});

  } catch (error: any) {
    return NextResponse.json(
      { message: `Error al insertar: ${error.message}` },
      { status: 500 }
    );
  }
}