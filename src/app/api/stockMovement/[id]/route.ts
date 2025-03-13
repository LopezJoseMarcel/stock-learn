import { NextResponse } from "next/server";
import StockMovementModel from "@/model/StockMovementModel";
import { dbConnection } from "@/utils/dbConnection";
import mongoose from "mongoose"; 

interface paramsInterface {
  params: Promise<{ id: string }>;
}

export async function GET(
  request: Request,
  { params }: paramsInterface
): Promise<NextResponse> {
  dbConnection();
  try {
    const { id } = await params;

    const Movement = await StockMovementModel.findById(id);

    // Retornar la respuesta
    return NextResponse.json(Movement);
  } catch (error: any) {
    return NextResponse.json(
      { message: `Error al guardar posición: ${error.message}` },
      { status: 500 }
    );
  }
}

//Add Stock entry to a movement.

export async function PATCH(
  request: Request,
  { params }: paramsInterface
): Promise<NextResponse> {
  dbConnection();

  try {
    const { searchParams } = new URL(request.url);
    const posId = searchParams.get("posId") || null;

    const { id } = await params;

    const body = await request.json();

    const { movement } = body;

    if (!posId) {
     
      if (!movement) {
        return NextResponse.json(
          {
            message: "Incorrect Movement Structure",
          },
          {
            status: 404,
          }
        );
      }

      const updatedMovement = await StockMovementModel.findByIdAndUpdate(
        id,
        {
          $push: { movements: movement },
        },
        { new: true }
      );

      return NextResponse.json(updatedMovement);
    } else {
      

      const result = await StockMovementModel.updateOne(
        {
          _id: new mongoose.Types.ObjectId(id),
          "movements._id": new mongoose.Types.ObjectId(posId),
        },
        Object.keys(movement).reduce((acc: { [key: string]: any }, key: string) => {
          acc[`movements.$.${key}`] = movement[key];
          return acc;
        },{})
      );

      return NextResponse.json(result);
    }
  } catch (error: any) {
    return NextResponse.json(
      { message: `Error al actualizar el array movements : ${error.message}` },
      { status: 500 }
    );
  }
}
