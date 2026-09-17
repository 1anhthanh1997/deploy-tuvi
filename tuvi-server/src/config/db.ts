import mongoose from "mongoose";
import { MongoClient } from "mongodb";

const connectDB = async () => {
  try {
    // Connection URI for local MongoDB
    const uri = process.env.MONGO_URI;
    console.log(uri)
    // Database Name
    const dbName = "test";
    // await mongoose.connect(process.env.MONGO_URI as string);
    await mongoose.connect(uri + dbName);

    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    process.exit(1);
  }
};

export default connectDB;
