import { format } from "@formkit/tempo";
import { Stock } from "@/types/interfacesModel"

const filterByRange = (data: Stock[], range: string) => {
  let groupedByYear: { [key: string]: Stock } = {};

  if (range === "5Y") {

    data.forEach((item) => {
      const date : string = item.value.datetime;
      const year: string = format(date,"YYYY","en");
      const month: string = format(date,"M","en")
      
      if (!groupedByYear[year] || month === "12") {
        groupedByYear[year] = item;  
      }

    });
    
    return Object.values(groupedByYear);
    
  }

 return data;

}

export default filterByRange;