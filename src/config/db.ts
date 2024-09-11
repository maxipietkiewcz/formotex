import mongoose from "mongoose";
import { MONGO_URI } from "./conf";

mongoose.connect(MONGO_URI || "");

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

export default db;
