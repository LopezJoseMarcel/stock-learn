import { NextResponse } from "next/server";
import { verify, JwtPayload } from "jsonwebtoken";
import { cookies } from "next/headers";


export async function GET(request: Request): Promise<NextResponse> {
 // dbConnection();
 const cookiesData = await cookies();
 const tokenJWT = cookiesData.get('tokenJWT');

 if (!tokenJWT) {
    return NextResponse.json({ message: "No existe el token" }, { status: 401 });
 }

  try {
    const user = verify(tokenJWT.value, process.env.JWT_PRIVATE_KEY as string) as JwtPayload & { _id: string };
    const userData = {
     id: user._id
    };
    
    return NextResponse.json(userData);
  } catch (error) {
    //console.error("Error al verificar el token:", error);
    return NextResponse.json({message:"Error al verificar el token" }, { status: 401 });
  }
}
//tokenJWT=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3Mzg0NDk2NzQsImlhdCI6MTczODI3Njg3NH0.n_DEjK4D8FZzVWJBcLZfq3xiNtl21G-l8caAx4ucUu0; Max-Age=2592000; Path=/; HttpOnly; SameSite=Strict

