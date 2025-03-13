import {UserModelUpdate} from "../types/interfacesModel";



export default async function updateUserService(userId: string, entry: UserModelUpdate) {
    try {
      const res = await fetch(`/api/user/${userId}`, {
          method: "PATCH",
          headers: { "Content-Type" : "application/json"},
          body: JSON.stringify(entry),
      });
  
      const data  = await res.json();
  
      if (!res.ok) {
          throw new Error("Response Error getting stocks");
      }

      return data;
      
    } catch (error) {
      console.log(error);
    }
  }