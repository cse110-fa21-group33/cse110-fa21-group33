const express = require('express');
const recipesModel = require('../database/models/recipesModel');
const verifyUserToken = require('../middleware/verifyUserToken');

const router = express.Router();

/* GET /recipes */
/*
  Get Recipe by id
*/
router.get('/recipeId/:recipeId', async (req, res) => {
  try {
    const { recipeId } = req.params;
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
        + ' internal server error',
      err,
    });
  }
});

/*
  Get Recipes by challenge
*/
router.get('/challenge/:challenge', async (req, res) => {
  try {
    const { challenge } = req.params;
    const rows = await recipesModel.getByChallenge(challenge);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Challenge information not found' });
    }

    const recipes = rows;
    return res.status(200).json(recipes);
  } catch (err) {
    console.error(err);
    return res.status(503).json({
      message: 'Failed to get challenge information due to'
        + ' internal server error',
      err,
    });
  }
});

/*
  Get Recipes by spiceRating
*/
router.get('/spiceRating/:spiceRating', async (req, res) => {
  try {
    const { spiceRating } = req.params;
    const rows = await recipesModel.getBySpiceRating(spiceRating);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'SpiceRating information not found' });
    }

    const recipes = rows;
    return res.status(200).json(recipes);
  } catch (err) {
    console.error(err);
    return res.status(503).json({
      message: 'Failed to get spiceRating information due to'
        + ' internal server error',
      err,
    });
  }
});

/* POST /recipes */
router.post('/', verifyUserToken, async (req, res) => {
  try {
    const newRecipe = req.body.recipe; // might have an array of ingredients req.body.ingredients
    // save the req.body.ingredients into another variable : ingredients
    const { userId } = req.userInfo;
    newRecipe.userId = userId;
    await recipesModel.createRecipe(newRecipe, req.body.ingredients);
    return res.status(200).json({ newRecipe, msg: 'Successfully created a new recipe' });
  } catch (err) {
    console.error(err);
    return res.status(500)
      .json({ err, data: 'Unable to add recipe' });
  }
});

router.delete('/:recipeId', verifyUserToken, async (req, res) => {
  try {
    const { userId } = req.userInfo;
    console.log(userId);
    const { recipeId } = req.params;
    await recipesModel.deleteRecipe(userId, recipeId);
    return res.status(200);
  } catch (err) {
    console.error(err);
    return res.status(500)
      .json({ err, data: 'Unable to delete recipe' });
  }
});

module.exports = router;
