import userModel from "@/model/userModel";
import { dbConnection } from "@/utils/dbConnection";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import { UserModelInterface } from "@/types/interfacesModel";

export async function POST(request: Request ) : Promise<NextResponse> {
    try {
        await dbConnection();
        const { userName, email, password } = await request.json();
        const userExistence  = await userModel.findOne({email});

        if (userExistence) {
            return NextResponse.json({message: "User already exists"});        
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new userModel<UserModelInterface>({
            userName,
            email,
            password: hashedPassword,
            buyingPower: 0
            
        });

        await newUser.save();


        return NextResponse.json({message: "User created successfully"},{status: 201});
    } catch (err) {
        return NextResponse.json({error: err}, {status: 500});
    }
}