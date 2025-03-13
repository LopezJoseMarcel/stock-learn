import updateUserService from "@/services/updateUserService";

type optionBuyingPower =  "add" | "cut"

export default async  function  buyingPowerAjust( userId: string, buyingPower: number, amount : number, option: optionBuyingPower  ) {
  let updBuyingPower: number;
  switch (option) {
    case "add":
        updBuyingPower = buyingPower + amount;
        break;
    case "cut":
        updBuyingPower = buyingPower - amount;
        break;
  }

  const updatedProperty = {
    buyingPower:  updBuyingPower  
  };

  const updateUser = await updateUserService(userId, updatedProperty);

  return updateUser;
}