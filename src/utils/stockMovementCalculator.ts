
export default function StockMovementCalculator( movements: any[] ) {

	let sharesQuantityTotal: number = 0;
	let averageOpeningPrice: number = 0;

  movements.forEach(movement => {
		if (movement.movementType === "buy") {
			sharesQuantityTotal += movement.sharesQuantity;
		    averageOpeningPrice += movement.openingPrice
		}
    
  });

	averageOpeningPrice = averageOpeningPrice /  movements.length;
	console.log("movements.length", movements.length);
	console.log("averageOpeningPrice", averageOpeningPrice);
	console.log("sharesQuantityTotal", sharesQuantityTotal);

	return {sharesQuantityTotal, averageOpeningPrice}
    
}