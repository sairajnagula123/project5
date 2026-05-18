// routes/recipeRoute.js

import express from "express";

import {
  getRecipes,
  addRecipe,
  deleteRecipe,
} from "../controllers/recipeController.js";

import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", verifyToken, getRecipes);

router.post("/", verifyToken, addRecipe);

router.delete("/:id", verifyToken, deleteRecipe);

export default router;