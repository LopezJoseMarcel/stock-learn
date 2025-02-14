import { useState, useEffect } from "react";
import { userGetService } from "@/services/userGetService";
import { UserModelInterface } from "@/types/interfacesModel";

const useUserHook = (id: string | null) => {
  const [ profile, setProfile ] = useState<UserModelInterface | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
      if (!id) return; // No ejecutar si no hay ID

      const fetchUser = async () => {
          setLoading(true);
          setError(null);
          try {
            const data = await userGetService(id);
            setProfile(data);
          } catch (error) {
            setError("Error fetching user: " + error);
          } finally {
              setLoading(false);
          }
      }

      fetchUser();
  }, [id]);

  return { profile, loading, error };
};

export default useUserHook;
