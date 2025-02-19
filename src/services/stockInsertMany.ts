export default async function stockInsertMany(symbol: string) {
  try {
    const res = await fetch(`/api/stock/${symbol}`, {
        method: "POST",
        headers: { "Content-Type" : "application/json"},
    })

    const data = await res.json()

    if (!res.ok) {
        throw new Error(data.message || "Error desconocido al Insert Many Stock");
    }

    return data;



  } catch (error: any) {
    console.error("Error en el insert:", error.message);
    throw error;
  }
}