import mongoose from "mongoose";
import { DATABASE_URI, NODE_ENV } from "../config/env.js";

if(!DATABASE_URI) {
    throw new Error("Please define the DATABASE_URI environment variable inside .env<development/production>.local file");
}

//Connect to MongoDB
const connectToDatabase = async () => {
  try{
    await mongoose.connect(DATABASE_URI);
    console.log(`Connected to MongoDB in ${NODE_ENV} mode`);
  } catch(error){
    console.error("Error connecting to MongoDB: ", error);
    throw error;
  }
}

export default connectToDatabase;