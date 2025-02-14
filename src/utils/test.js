const array = [
    {
        "_id": {
          "$oid": "67978dc32371041ce516f8c6"
        },
        "user_id": {
          "$oid": "67a4b701bd054c23d240763e"
        },
        "symbol": "C",
        "sharesQuantityTotal": 60,
        "averageOpeningPrice": 183.5,
        "movements": [
          {
            "movementType": "sell",
            "sharesQuantity": 50,
            "openingPrice": 50,
            "openDate": {
              "$date": "2023-11-15T00:00:00.000Z"
            },
            "_id": {
              "$oid": "67978dc32371041ce516f8c7"
            }
          },
          {
            "movementType": "sell",
            "sharesQuantity": 10,
            "openingPrice": 54,
            "openDate": {
              "$date": "2023-11-17T00:00:00.000Z"
            },
            "_id": {
              "$oid": "67978dc32371041ce516f8c8"
            }
          }
        ],
        "__v": 0
    },
    {
        "_id": {
          "$oid": "679791402371041ce516f8cb"
        },
        "user_id": {
          "$oid": "67a4b701bd054c23d240763e"
        },
        "symbol": "GOLF",
        "sharesQuantityTotal": 70,
        "averageOpeningPrice": 189,
        "movements": [
          {
            "movementType": "sell",
            "sharesQuantity": 50,
            "openingPrice": 70,
            "openDate": {
              "$date": "2023-11-02T00:00:00.000Z"
            },
            "_id": {
              "$oid": "679791402371041ce516f8cc"
            }
          },
          {
            "movementType": "buy",
            "sharesQuantity": 10,
            "openingPrice": 100,
            "openDate": {
              "$date": "2023-11-12T00:00:00.000Z"
            },
            "_id": {
              "$oid": "679791402371041ce516f8cd"
            }
          }
        ],
        "__v": 0
    }
];


let array2 = array.filter(stock => stock.movements.some(mov => mov.movementType === "buy"));
console.log("array2",array2);

let array3 = array.filter(stock => stock.movements.every(mov => mov.movementType != "buy"));
console.log("array3",array3);