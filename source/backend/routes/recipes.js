const express = require('express');
const recipesModel = require('../database/models/recipesModel');
const verifyUserToken = require('../middleware/verifyUserToken');

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

/* POST /recipes */
router.post('/', verifyUserToken, async (req, res) => {
  try {
      const newRecipe = req.body; // might have an array of ingredients req.body.ingredients
      // save the req.body.ingredients into another variable : ingredients

      const { userId } = req.userInfo;
      newRecipe.userId = userId;
      await recipesModel.createRecipe(newRecipe);
      return res.status(200).json({newRecipe, msg: "Successfully created a new recipe"});
  } catch (err) {
      console.error(err);
      return res.status(500)
          .json({err, data: 'Unable to add recipe'});
  }
});

router.delete('/recipes/:recipeId', verifyUserToken, async (req, res) => {
  try {
    const { userId } = req.userInfo;
    const recipeId = req.params.id;
    await recipesModel.deleteRecipe(userId, recipeId);
    return res.status(200);
  } catch (err) {
    console.error(err);
    return res.status(500)
          .json({err, data: 'Unable to delete recipe'});
  }
});

module.exports = router;

