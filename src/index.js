import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import "dotenv/config";

import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";

const app = express();
const port = process.env.PORT;
const dbUri = process.env.DB_URI;

app.use(express.json());
app.use(cookieParser())
app.use("/users", userRouter);
app.use("/auth", authRouter);

app.listen(port, async () => {
  console.log(`Server listening on port ${port}`);
  console.log("Awaiting database connection");
  await mongoose.connect(dbUri);
  console.log("Database connection established successfully");
});
