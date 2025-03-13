import {MovementsEntries} from "../types/interfacesModel";

interface updateMovementParamater {
  movement: MovementsEntries
}

export default async function updateMovement(movementId: string, entry: updateMovementParamater) {
    try {
      const res = await fetch(`/api/stockMovement/${movementId}`, {
          method: "PATCH",
          headers: { "Content-Type" : "application/json"},
          body: JSON.stringify(entry),
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