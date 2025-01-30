import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";
import userModel from "@/model/userModel";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({message: "Faltan Datos", code: 1});
    }

    const userExistence = await userModel.findOne({email})

    if (!userExistence) {
      return NextResponse.json({message: "Credenciales inválidas", code: 1});
    }

    const checkPassword = await bcrypt.compare(password, userExistence.password);

    if (!checkPassword) {
      return NextResponse.json({message: "Credenciales inválidas", code: 1});
    }


    const { userId } = userExistence;

    const token = jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 2, // Expira en 2 días
        _id: userId,
      },
      process.env.JWT_PRIVATE_KEY as string
    );

    const serialized = serialize("tokenJWT", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });

    const headers = { "Set-Cookie": serialized };

    return NextResponse.json({ message: "Login exitoso", code:0}, { headers });
  } catch (err: any) {
    return NextResponse.json({message: err}, {status: 500});
  }
}
