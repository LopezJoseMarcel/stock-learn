import { NextResponse } from "next/server";
import StockMovementModel from "@/model/StockMovementModel";
import { dbConnection } from "@/utils/dbConnection";
import StockMovementCalculator from "@/utils/stockMovementCalculator";

export async function POST(request: Request): Promise<NextResponse> {
  dbConnection();

  try {
    const body = await request.json();

    const { symbol, movements, user_id } = body;

    const { sharesQuantityTotal, averageOpeningPrice } =
      StockMovementCalculator(movements);

    const newMovement = new StockMovementModel({
      user_id,
      symbol,
      sharesQuantityTotal,
      averageOpeningPrice,
      movements,
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
}

export async function GET(request: Request): Promise<NextResponse> {
  dbConnection();

  try {
    const { searchParams } = new URL(request.url);

    const userId = searchParams.get("user_id");

    if (!userId) {
      return NextResponse.json(
        { message: "El parametro 'user_id' es requerido." },
        { status: 400 }
      );
    }

    const stockMovements =  await  StockMovementModel.find({ user_id: userId });

    return NextResponse.json(stockMovements);

  } catch (error: any) { 
    return NextResponse.json({ message: `Error al obtener posiciones: ${error.message}` }, { status: 500 });
  }

 
}
