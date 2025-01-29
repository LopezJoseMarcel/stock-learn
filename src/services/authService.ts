export async function login(email: string, password: string) {
  try {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Error desconocido al iniciar sesión");
    }

    return data;
  } catch (error: any) {
    console.error("Error en el login:", error.message);
    throw error;
  }
}
