import express from "express";
import {
  GetUserByEmail,
  GetUsers,
  Login,
  registerUser,
} from "../controllers/userController.js";

const userRoutes = express.Router();

userRoutes.post("/add", registerUser);
userRoutes.get("/", GetUsers);
userRoutes.get("/:email", GetUserByEmail);
userRoutes.post("/login", Login);

export default userRoutes;
