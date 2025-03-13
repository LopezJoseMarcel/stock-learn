import { NextResponse } from "next/server";
import { dbConnection } from "@/utils/dbConnection";
import userModel from "@/model/userModel";
import { UserModelUpdate } from "@/types/interfacesModel";

interface paramsInterface {
    params: Promise<{ id: string }>
};

export async function GET(request : Request, {params}: paramsInterface): Promise<NextResponse>{
  try {
    await dbConnection();
    const { id } = await params;
   
    const user = await userModel.findById(id,'userName email movements buyingPower');

    if(!user){
      return NextResponse.json(
        {
          message: "User not found"
        },
        {
          status: 404
        }
      )
    }   
    
    return NextResponse.json(user);

  } catch (error: any) {
    return NextResponse.json({error: error.message}, {status: 500});
  }
}

export async function PATCH(request: Request, { params }: paramsInterface) : Promise<NextResponse> {

  try {
    await dbConnection();
    const { id } = await params;
    
    const body = await request.json();

    const user : UserModelUpdate = body;


   
    const userUpdate = await userModel.findByIdAndUpdate(id, {
      $set: user
    });
  
    return NextResponse.json({message: "User Updated", code:1});

  } catch (error: any) {
    return NextResponse.json({message: error.message, code:0}, {status: 500});
  }
}