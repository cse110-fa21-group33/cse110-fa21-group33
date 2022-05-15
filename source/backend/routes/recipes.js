const express = require('express');
const recipesModel = require('../database/models/recipesModel');

const router = express.Router();

/* GET /recipes */
/*
  Get Recipe by id
*/
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

/*
  Get Recipes by challenge
*/
router.get('/:challenge', async (req, res) => {
  try {
    const { challenge } = req.params.getByChallenge;
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
        + 'internal server error',
      err,
    });
  }
});

/*
  Get Recipes by spiceRating
*/
router.get('/:spiceRating', async (req, res) => {
  try {
    const { spiceRating } = req.params.getBySpiceRating;
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
        + 'internal server error',
      err,
    });
  }
});

module.exports = router;

