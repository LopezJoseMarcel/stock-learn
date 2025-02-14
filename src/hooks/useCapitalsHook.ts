import { useEffect, useState } from 'react';
import capitalsCalculator from '@/utils/capitalsCalculator';
import { useCapitalsHookProps } from '@/types/interfacesElement';



const useCapitalsHook = (userId: string | undefined, buyingPower: number | null) => {
    const [capital, setCapital] = useState<useCapitalsHookProps | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    
    useEffect(() => {
        const fetchCapital = async () => {
         if(!userId || buyingPower == null) return;
            setLoading(true);
            setError(null);
            try {
            const capital = await capitalsCalculator(userId, buyingPower);
            setCapital(capital);
            } catch (error) {
            setError("Error fetching user: " + error);
            } finally {
            setLoading(false);
            }
        
        };
    
        fetchCapital();
    }, [userId, buyingPower]);

   
    return { capital, loading, error };
}

export default useCapitalsHook;