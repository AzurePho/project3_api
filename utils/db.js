import mongoose from "mongoose";
import { DB_CONNECTION_STRING } from "../consts.js";

export async function connectToDb() {
  mongoose.set("strictQuery", false);
  return mongoose.connect(DB_CONNECTION_STRING);
  // console.log("Connecting to db should be here");
}
