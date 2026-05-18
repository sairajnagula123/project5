// controllers/recipeController.js

import Recipe from "../models/Recipe.js";
import UserModel from "../models/User.js";

// add recipe
export const addRecipe = async (req, res) => {
  try {
    const { title, ingredients, instructions, email } = req.body;

    // find user using email
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const newRecipe = await Recipe.create({
      title,
      ingredients,
      instructions,
      userId: user._id,
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

// get recipes by email
export const getRecipes = async (req, res) => {
  try {
    const { email } = req.params;

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const recipes = await Recipe.find({
      userId: user._id,
    });

    res.status(200).json({
      message: "Recipes fetched successfully",
      data: recipes,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error fetching recipes",
      error: err.message,
    });
  }
};