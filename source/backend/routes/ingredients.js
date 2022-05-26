const express = require('express');

const router = express.Router();
const recipesModel = require('../database/models/recipesModel');
const recipesIngredientsModel = require('../database/models/recipeIngredientsModel');

/**
 * Get Ingredients by recipe id
 */
router.get('/:recipeId', async (req, res) => {
    try {
        const { recipeId } = req.params;
        const recipeRows = await recipesModel.getByRecipeId(recipeId);
        if (recipeRows.length === 0) {
            return res.status(404).json({ message: 'Recipe information not found' });
        }
        const ingredients = await recipesIngredientsModel.getIngredientsByRecipeId(recipeId);
        return res.status(200).json(ingredients);
    } catch (err) {
        console.error(err);
    }
});

module.exports = router;