import express from "express";
import mongoose from "mongoose";
import { router } from "./routes/route";

const app = express();

mongoose
  .connect("mongodb://127.0.0.1:27017/movie")
  .then(() => {
    console.log("✅ Connected to MongoDB");
  })
  .catch((err: Error) => {
    console.error("❌ MongoDB connection error:", err.message);
  });

app.use(express.json());
app.use("/api", router);

app.listen(3000, () => {
  console.log("🚀 Server is running on http://localhost:3000");
});
