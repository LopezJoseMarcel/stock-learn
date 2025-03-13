import { NextResponse } from "next/server";
import { dbConnection } from "@/utils/dbConnection";
import StockModel from "@/model/StockModel";

interface paramsInterface{
    params:Promise<{symbol:string}>
}

export async function GET(request: Request,{ params }: paramsInterface, ) : Promise<NextResponse> {
 // Conectar a la base de datos
  dbConnection();
  try {

    const {symbol} = await params;
    const {searchParams} = new URL(request.url); 
    const date = searchParams.get("date");

      // Validar y convertir la fecha a string ISO para MongoDB
    if (!date) {
        return NextResponse.json({ message: "Missing date parameter" }, { status: 400 });
      }
  
      const targetDate = new Date(date);
      if (isNaN(targetDate.getTime())) {
        return NextResponse.json({ message: "Invalid date format" }, { status: 400 });
      }
  
      // Convertir la fecha a formato ISO para que MongoDB la entienda
      const isoTargetDate = targetDate.toISOString(); // "2023-12-06T00:00:00.000Z"
  
     
  
      // Consulta de agregación
      const stock = await StockModel.aggregate([
        { 
          $match: { "meta.symbol": symbol } 
        },
        { 
          $addFields: { 
            "value.datetime": { 
              $dateFromString: { "dateString": "$value.datetime" } 
            } 
          } 
        },
        { 
          $addFields: { 
            "dateDiff": { 
              $abs: { 
                $subtract: ["$value.datetime", { $dateFromString: { dateString: isoTargetDate } }] 
              } 
            } 
          } 
        },
        { 
          $sort: { "dateDiff": 1 } 
        },
        { 
          $limit: 1 
        },
        { 
          $project: { 
            meta: 1, 
            value: 1, 
            dateDiff: 1 
          } 
        }
      ]);
  
      return NextResponse.json(stock);
    
  } catch (error) {
    return NextResponse.json({message:"Error" + error}, {"status":500});
  }

  
}


