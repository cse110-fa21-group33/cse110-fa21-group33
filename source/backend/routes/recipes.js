const express = require('express');
const recipesModel = require('../database/models/recipesModel');
const savedRecipesModel = require('../database/models/savedRecipesModel');
const router = express.Router();

/* GET /recipes */
router.get('/:id', async (req, res) => {
  try {
    const { recipeId } = req.params.getByRecipeId;
    const rows = await recipesModel.getByRecipeId(recipeId);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Recipe information not found' });
    }

    const recipe = rows[0];
    return res.status(200).json(recipe);
  } catch (err) {
    console.error(err);
    return res.status(503).json({
      message: 'Failed to get recipe information due to'
        + 'internal server error',
      err,
    });
  }
});

/* PUT /recipes/:recipeId */
router.put('/:id', async (req, res) => {
  try {
    const { recipeId } = req.params.getByRecipeId;
    const userId = req.body.userId;
    const rows = await savedRecipesModel.getByUserIdAndRecipeId(userId, recipeId);
    const recipe = rows[0];
    const updatedRecipe = req.body;

    if (!recipe.isCreator) {
      return res.status(401).json({ message: 'Unauthorized user' })
    }
    
    await recipesModel.updateByRecipeId(recipeId, updatedRecipe);
    return res.status(200).json(updatedRecipe);
  } catch (err) {
    console.error(err);
    return res.status(503).json({
      message: 'Failed to get recipe information due to'
        + 'internal server error',
      err,
    });
  }
});

module.exports = router;

