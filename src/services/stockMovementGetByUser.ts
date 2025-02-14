export async function stockMovementGetByUser(id: string) {
  try {

    const res = await fetch(`/api/stockMovement?user_id=${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    })

    const data = await res.json();

    if (!res.ok) {
        console.log(data.message);
        throw new Error(data.message);
    }

    return data

    
  } catch (error) {
    console.log("Error: " + error);
    throw error;
  }
}