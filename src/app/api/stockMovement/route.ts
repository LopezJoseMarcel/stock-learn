import { NextResponse } from "next/server";
import StockMovementModel from "@/model/StockMovementModel";
import { dbConnection } from "@/utils/dbConnection";
import StockMovementCalculator from "@/utils/stockMovementCalculator";


export async function POST(request: Request): Promise<NextResponse> {

    dbConnection();
    
    try {
       const body = await request.json();

       const { symbol, movements } = body;
       
       const {sharesQuantityTotal, averageOpeningPrice} = StockMovementCalculator(movements);

       const newMovement = new StockMovementModel({
         symbol,
         sharesQuantityTotal,
         averageOpeningPrice,
         movements
       });

       const savedNewMovement = await newMovement.save();

       // Retornar la respuesta
       return NextResponse.json(savedNewMovement);
       
    } catch (error: any) {
        return NextResponse.json(
            { message: `Error al guardar posición: ${error.message}` },
            { status: 500 }
          );
    }
};


