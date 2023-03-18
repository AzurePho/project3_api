import { connectToDb } from "./db.js";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import express from "express";
import Drinks from "./models/drink.js";
import user from "../models/user.js";

async function hashPassword(plainTextPassword) {
  const hashedPassword = await bcrypt.hash(plainTextPassword, 10);
  return hashedPassword;
}

const app = express();

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
      username: "admin",
      password: await hashPassword("adminpassword"),
      role: "admin",
      // id: ,
    },
    {
      email: "user1@gmail.com",
      username: "user1",
      password: await hashPassword("user1@1234"),
      role: "user",
      // id: ,
    },
    {
      email: "user2@gmail.com",
      username: "user2",
      password: await hashPassword("user2@1234"),
      role: "user",
      // id: ,
    },
    {
      email: "user3@gmail.com",
      username: "user3",
      password: await hashPassword("user3@1234"),
      role: "user",
      // id: ,
    },
    {
      email: "user4@gmail.com",
      username: "user4",
      password: await hashPassword("user4@1234"),
      role: "user",
      // id: ,
    },
  ],
};

async function seedDb() {
  await connectToDb();
  await mongoose.connection.db.dropDatabase();
  console.log("Database connected");
  const drinksDb = await Drinks.create(drinks);
  console.log(drinksDb);
  const usersDb = await user.create(users);
  console.log(usersDb);
  mongoose.disconnect();
}
