import * as dotenv from "dotenv";
dotenv.config();
import morgan from "morgan";
import jobRouters from "./routes/router.js";

import express from "express";
import mongoose from "mongoose";
import ErrorMiddleWare from "./ErrorMiddleWare/ErrorMiddleWare.js";
import authRouter from "./routes/auth_router.js";
import userRouter from "./routes/user_route.js";
import { authenticateUser } from "./ErrorMiddleWare/authMiddleWare.js";
import cookieParser from "cookie-parser";
import cloudinary from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

//uploads dir
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";

const app = express();
app.use(morgan());
if ((process.env.NODE_ENV = "development")) {
  app.use(morgan("dev"));
}

//___dirname
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.static(path.resolve(__dirname, "./public")));

app.use(express.json());

app.use(cookieParser());

app.get("/api/v1/test", (req, res) => {
  res.json({ msg: "test route" });
});

app.use("/api/v1/jobs", authenticateUser, jobRouters);

app.use("/api/v1/users", authenticateUser, userRouter);

app.use("/api/v1/auth", authRouter);


app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./public", "index.html"), "utf-8");
});


// not found middleware
app.use("*", (req, res) => {
  res.status(404).json({ message: "Endpoint not found" });
});

// error middleware
app.use(ErrorMiddleWare);

const port = process.env.port || 5100;

try {
  await mongoose.connect(process.env.MONGO_DB);
  app.listen(port, () => {
    console.log(`Server is working on port ${port}`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
