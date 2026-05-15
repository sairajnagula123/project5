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