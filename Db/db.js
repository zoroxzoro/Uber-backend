import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    mongoose.connect(process.env.URI);
    console.log("Database connected");
  } catch (error) {
    console.log(error);
  }
};
