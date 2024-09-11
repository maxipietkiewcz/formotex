import mongoose from "mongoose";
import { MONGO_URI } from "./conf";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI || "");
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Finaliza la aplicación si falla la conexión
  }
};

export default connectDB;
