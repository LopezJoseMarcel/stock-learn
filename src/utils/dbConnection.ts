import mongoose from "mongoose";

const conn = {
  isConnected : false
};

const ConnectionString: string = process.env.mongo_db_string || "default_connection_string"


export async function dbConnection() {
  if (conn.isConnected) return;

  const db = await mongoose.connect(ConnectionString); 
  if (db.connection.db) {
     console.log(db.connection.db.databaseName);
     
   }
   conn.isConnected = db.connections[0].readyState ? false : true
  }
mongoose.connection.on('connected', () => {
  console.log('Conectado a la base de datos');
});

mongoose.connection.on('error', (err) => {
  console.log('Error al conectarce la base de datos !! ' + err);
});