import mongoose from "mongoose";


const dbConnect = async () => {
  if (mongoose.connection.readyState >= 1) {
    return; 
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};

export default dbConnect;
