import userModel from "@/model/userModel";
import { dbConnection } from "./dbConnection";
import { verifyPassword } from "./argon2Funtions";

export default async function authByEmailPwd(email: string, password: string) {
  try {
    // Asegurar conexión a la base de datos
    await dbConnection();

    // Buscar el usuario por email
    const user = await userModel.findOne({ email });

    if (!user) {
      return null; 
    }

    // Verificar contraseña
    const verified = await verifyPassword(password, user.password);

    if (!verified) {
      return null; 
    }

    return { userId: user._id };
  } catch (error: any) {
    console.error("Error en authByEmailPwd:", error.message);
    return null; // Retornar null en caso de error en la base de datos
  }
}
