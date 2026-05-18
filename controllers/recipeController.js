// controllers/recipeController.js

import Recipe from "../models/Recipe.js";

export const addRecipe = async (req, res) => {
  try {
    const { title, ingredients, instructions, userId } = req.body;

    // count recipes of that user
    const totalRecipes = await Recipe.countDocuments({ userId });


    const newRecipe = await Recipe.create({
      title,
      ingredients,
      instructions,
      userId,
    });

    res.status(201).json({
      message: "Recipe Added Successfully",
      data: newRecipe,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error adding recipe",
      error: err.message,
    });
  }
};