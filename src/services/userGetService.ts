export async function userGetService(id: string) {
    try {
      const res = await fetch(`/api/user/${id}`,{
        method: "GET",
        headers: { "Content-Type": "application/json" }
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      return data;

    } catch (error: any) {
        console.error("Error al get user:", error.message);
        throw error;
    }
  }
  