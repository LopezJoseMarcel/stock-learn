import { NextResponse } from "next/server";
import { serialize } from "cookie"

export async function POST(request: Request) : Promise<NextResponse> {

 const cookieHeader = request.headers.get('cookie');
 const cookies = cookieHeader ? Object.fromEntries(cookieHeader.split('; ').map(c => c.split('='))) : {};
 const tokenJWT = cookies['tokenJWT'];

 if (!tokenJWT) {
    return new NextResponse("No existe el token", { status: 401 });
 } 

  try {
    //const user = verify(tokenJWT.value, process.env.JWT_PRIVATE_KEY);

    const serialized = serialize('tokenJWT', '',{
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',//porque voy a usar todo en el mismo dominio
        maxAge: 0,
      path: '/'
    });

    const headers = {'Set-Cookie':serialized};

    return NextResponse.json({message: 'logout succesfully'},{headers});
    
    
    //return NextResponse.json(userData);
  } catch (error) {
    console.error("Error al verificar el token:", error);
    return NextResponse.json({message:"token invalido" }, { status: 401 });
  }
}


