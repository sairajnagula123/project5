// routes/recipeRoute.js

import express from "express";

import {
    getRecipes,
    addRecipe,
    deleteRecipe
} from "../controllers/recipeController.js";

const router = express.Router();

router.get("/", getRecipes);

router.post("/", addRecipe);

router.delete("/:id", deleteRecipe);

export default router;