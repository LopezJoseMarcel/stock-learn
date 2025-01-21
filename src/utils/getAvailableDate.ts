import { parse, addDay, format  } from "@formkit/tempo";

export default function getAvailbleDate(): string {

    let today : Date = addDay(new Date(),-5) ;
    
    let actualDateDay = format(today, "dddd", "en");
    console.log(actualDateDay);

    let lastLaborDate = today;

    switch (actualDateDay) {
        case "Saturday":
            lastLaborDate = addDay(today,-1);
        break;
        case "Sunday":
            lastLaborDate = addDay(today,-2);
        break;
    }

    const newDateString = format(lastLaborDate, "YYYY-MM-DD", "en");
 
  return newDateString;
}

