// routes/recipeRoute.js

import express from "express";

import {
  getRecipes,
  addRecipe,
} from "../controllers/recipeController.js";

import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", addRecipe);

router.get("/:email", getRecipes);

export default router;