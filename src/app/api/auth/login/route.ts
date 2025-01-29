import { NextResponse } from "next/server"; 
import jwt from "jsonwebtoken";
import { serialize } from "cookie";
import authByEmailPwd from "@/utils/authByEmailPwd";

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ message: 'Faltan datos' }, { status: 400 });
    }

    const { userId } = await authByEmailPwd(email, password);

    const token = jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 2, // Expira en 2 días
        _id: userId,
      },
      process.env.JWT_PRIVATE_KEY as string
    );

    const serialized = serialize('tokenJWT', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 30, // En segundos
      path: '/',
    });

    const headers = { 'Set-Cookie': serialized };

    return NextResponse.json({ message: 'Login exitoso' }, { headers });
  } catch (error: any) {
    console.error('Error en el login:', error.message);

    // Asegurar que se devuelve JSON sin interrumpir la app
    return NextResponse.json(
      { message: error.message || 'Error interno en el servidor' },
      { status: 401 }
    );
  }
}

