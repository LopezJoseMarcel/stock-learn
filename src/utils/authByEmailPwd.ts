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
      // Usuario no encontrado
      throw new Error("Usuario no encontrado");
    }

    // Verificar contraseña
    const verified = await verifyPassword(password, user.password);

    if (!verified) {
      // Contraseña incorrecta
      throw new Error("Contraseña incorrecta");
    }

    // Devolver el ID del usuario
    return { userId: user._id };
  } catch (error: any) {
    console.error("Error en authByEmailPwd:", error.message);
    throw new Error(
      error.message || "Error interno en el servidor durante la autenticación"
    );
  }
}
