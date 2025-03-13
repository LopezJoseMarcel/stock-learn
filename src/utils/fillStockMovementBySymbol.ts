import { StockMovement } from "@/types/interfacesModel"

 export default class StockMovementBySymbol {
    stockMovements: StockMovement[];
    symbol: string;
    private filteredMovements: StockMovement[] = [];

    constructor(stockMovements: StockMovement[], symbol:string) {
        this.stockMovements = stockMovements;
        this.symbol = symbol;
        this.filteredMovements = stockMovements.filter(movement => movement.symbol === this.symbol);
    }
    checkSize() {
     return this.filteredMovements.length;
    }

    get getFilteredMovements() : StockMovement[] {
      return this.filteredMovements;
    }

}

