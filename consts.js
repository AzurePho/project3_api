import dotenv from "dotenv";

dotenv.config();

// export const DB_CONNECTION_STRING =
//   process.env.DB_CONNECTION_STRING || "mongodb://localhost:27017/drinks";

export const DB_CONNECTION_STRING =
  process.env.DB_CONNECTION_STRING ||
  "mongodb://localhost:27017/drinks";

export const JWT_SECRET = process.env.JWT_SECRET || "cola";
