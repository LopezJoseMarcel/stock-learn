import { format } from "@formkit/tempo";

export default function getFirstDate(data: any[]) {
    
    if (data.length === 0) return null;
    
    let firstDate = new Date(data[0]);
    
    data.forEach((element) => {
        const elementDate = new Date(element);
        if (elementDate < firstDate) {
            firstDate = elementDate;
        }
    });
    
    const dateString: string = format(firstDate, "YYYY-MM-DD", "en")

    return dateString;   

}
