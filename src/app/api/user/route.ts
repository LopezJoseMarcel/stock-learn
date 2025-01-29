import { NextResponse } from "next/server";
import { dbConnection } from "@/utils/dbConnection";
import userModel from "@/model/userModel";
import { createHash, verifyPassword } from "@/utils/argon2Funtions";

interface paramsInterface {
 params: Promise<{"id" : string}>
}

export async function POST(request:Request): Promise<NextResponse> {
    dbConnection();
    try {

        const body = await request.json();

        const { userName, email, password } = body;

        const passwordHash = await createHash(password);

        const user = new userModel({
          userName, email, 
          password: passwordHash
        });

        const userSaved = await user.save();

        return NextResponse.json({
            userSaved, 
        })
        
    } catch (error:any) {
        return NextResponse.json(
            { "Error" :  error}
        )
    }
}


