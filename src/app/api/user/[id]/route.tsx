import { NextResponse } from "next/server";
import { dbConnection } from "@/utils/dbConnection";
import userModel from "@/model/userModel";

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