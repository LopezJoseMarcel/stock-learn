'use server';
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";
import authByEmailPwd from "@/utils/authByEmailPwd";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return new Response(JSON.stringify({ message: "Faltan datos" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const authResult = await authByEmailPwd(email, password);

    if (!authResult) {
      return new Response(JSON.stringify({ message: "Credenciales inválidas" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const { userId } = authResult;

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

    return new Response(JSON.stringify({ message: "Login exitoso" }), {
      status: 200,
      headers: { "Content-Type": "application/json", "Set-Cookie": serialized },
    });
  } catch (error: any) {
    console.error("Error en el login:", error.message);
    return new Response(JSON.stringify({ message: "Error interno del servidor" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
