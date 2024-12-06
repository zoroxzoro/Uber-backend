import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./Db/db.js"; // Ensure the `connectDB` function is correctly implemented
import userRouter from "./routes/User.routes.js";
import captainRouter from "./routes/captain.routes.js";
import cookieParser from "cookie-parser";
// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 3000;

// Initialize the Express app
const app = express();

// Middleware
app.use(cors());
app.use(cookieParser());
app.use(express.json());

// Routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/captain", captainRouter);

// Start the server
app.listen(PORT, async () => {
  try {
    await connectDB(); // Ensure DB connection before proceeding
    console.log(`Server is running on port ${PORT}`);
  } catch (error) {
    console.error("Error connecting to the database:", error);
    process.exit(1); // Exit if DB connection fails
  }
});
