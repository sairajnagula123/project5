// controllers/recipeController.js

import Recipe from "../models/Recipe.js";

export const getRecipes = async (req, res) => {

    try {
        const recipes = await Recipe.find();

        res.status(200).json(recipes);
    } 
    catch (err) {
        res.status(500).json({
            message: "Error fetching recipes"
        });
    }
};

export const addRecipe = async (req, res) => {

    try {
        const recipeDetails = req.body;

        const newRecipe = await Recipe.create(recipeDetails);

        res.status(201).json({
            message: "Recipe Added Successfully",
            data: newRecipe
        });
    } 
    catch (err) {
        res.status(500).json({
            message: "Error adding recipe"
        });
    }
};

// Delete Recipe

export const deleteRecipe = async (req, res) => {

    try {

        const { id } = req.params;

        // find and delete recipe
        const deletedRecipe = await Recipe.findByIdAndDelete(id);

        // if recipe not found
        if (!deletedRecipe) {
            return res.status(404).json({
                message: "Recipe not found"
            });
        }

        res.status(200).json({
            message: "Recipe Deleted Successfully",
            data: deletedRecipe
        });

    }
    catch (err) {

        res.status(500).json({
            message: "Error deleting recipe",
            error: err.message
        });
    }
};