
export default async function newStockMovementService( entry: any) {
    try {
      const res = await fetch(`/api/stockMovement`, {
          method: "POST",
          headers: { "Content-Type" : "application/json"},
          body: JSON.stringify(entry)
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