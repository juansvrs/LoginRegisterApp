import mongoose from "mongoose";

// const URI = "mongodb://localhost/prueba";

const URI='mongodb+srv://juan:juan@cluster0.4xbq1xd.mongodb.net/crudemy'

export const connectDB = async () => {
  try {
    const db = await mongoose.connect(URI);
    console.log(`base de datos conectada  ${db.connection.name}`);
  } catch (error) {
    console.log(`error al conectar a la base de datos ${error.message}`);
  }
};

