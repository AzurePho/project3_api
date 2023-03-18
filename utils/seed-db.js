import { connectToDb } from "./db.js";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import Drink from "../models/drink.js";
import User from "../models/user.js";

async function hashPassword(plainTextPassword) {
  const hashedPassword = await bcrypt.hash(plainTextPassword, 10);
  return hashedPassword;
}

const adminId = "6415b7edeb5413625c883fda";
const userId = "6415b7edeb5413625c883fdb";

const seedingData = {
  drinks: [
    {
      name: "Fanta",
      flavour: "Orange",
      description: "Fizzy drink...",
      calories: 50,
      allergies: "n/a",
      alcohol: false,
      image:
        "https://images.unsplash.com/photo-1624517452488-04869289c4ca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=803&q=80",
    },
    {
      name: "Coca-cola",
      flavour: "Original",
      description: "Fizzy drink...",
      calories: 50,
      allergies: "n/a",
      alcohol: false,
      image:
        "https://images.unsplash.com/photo-1554866585-cd94860890b7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80",
    },
    {
      name: "Sprite",
      flavour: "Original",
      description: "Fizzy drink...",
      calories: 39,
      allergies: "n/a",
      alcohol: false,
      image:
        "https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    },
    {
      name: "Monster",
      flavour: "Original",
      description: "Fizzy drink...",
      calories: 48,
      allergies: "n/a",
      alcohol: false,
      image:
        "https://images.unsplash.com/photo-1622543925917-763c34d1a86e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    },
    {
      name: "Pepsi",
      flavour: "Original",
      description: "Fizzy drink...",
      calories: 48,
      allergies: "n/a",
      alcohol: false,
      image:
        "https://images.unsplash.com/photo-1622543925917-763c34d1a86e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    },
  ],
  users: [
    {
      email: "admin@gmail.com",
      userName: "admin",
      password: await hashPassword("adminpassword"),
      role: "admin",
      id: adminId,
    },
    {
      email: "user1@gmail.com",
      userName: "user1",
      password: await hashPassword("user1@1234"),
      role: "user",
      id: userId,
    },
  ],
};

async function seedDb() {
  await connectToDb();
  await mongoose.connection.db.dropDatabase();
  console.log("Database connected");
  const drinksDb = await Drink.create(
    seedingData.drinks.map((drink) => ({
      ...drink,
      createdBy: userId,
    }))
  );
  console.log(drinksDb);
  const usersDb = await User.create(seedingData.users);
  console.log(`created ${usersDb.length} users in database`);
  console.log(usersDb);
  await mongoose.disconnect();
}

seedDb();
