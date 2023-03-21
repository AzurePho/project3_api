import express from "express";
import mongoose from "mongoose";
import { connectToDb } from "./utils/db.js";
import fallthroughHandler from "./middleware/fallthroughHandler.js";
import logger from "./middleware/logger.js";
import errorHandler from "./middleware/errorHandler.js";
import router from "./router.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = 999;

// logger
app.use(cors());
app.use(express.json());
app.use(logger);
app.use(router);
app.use(errorHandler);
app.use(fallthroughHandler);
app.use((req, res, next) => {
  console.log(`${req.method} Request received at ${req.url}`);
  next();
});

// app.use(router);

const startServer = async () => {
  await connectToDb();
  console.log("Database connected");
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
};

startServer();
