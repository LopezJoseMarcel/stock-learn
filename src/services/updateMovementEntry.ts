import {MovementsEntries} from "../types/interfacesModel";

export default async function updateMovementEntry(movementId: string, entryId: string, entry: MovementsEntries) {
    try {
      const res = await fetch(`/api/stockMovement/${movementId}?posId=${entryId}`, {
          method: "PATCH",
          headers: { "Content-Type" : "application/json"},
          body: JSON.stringify({ movement: entry }),
      });
  
      const data  = await res.json();
  
      if (!res.ok) {
          throw new Error("Response Error getting stocks");
      }
      console.log(data);
      return data;
      
    } catch (error) {
      console.log(error);
    }
  }