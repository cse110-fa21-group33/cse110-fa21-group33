const express = require('express');
const { verify } = require('jsonwebtoken');
const recipesModel = require('../database/models/recipesModel');
const recipeIngredientsModel = require('../database/models/recipeIngredientsModel');

const verifyUserToken = require('../middleware/verifyUserToken');
const verifyUserTokenIfExists = require('../middleware/verifyUserTokenIfExists');
const completedRecipesModel = require('../database/models/completedRecipesModel');

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

/* PUT /recipes/:recipeId */
router.put('/:recipeId', verifyUserToken, async (req, res) => {
  try {
    const { userId } = req.userInfo;
    const { recipeId } = req.params;

    const recipe = await recipesModel.getByUserIdAndRecipeId(userId, recipeId);
    if (recipe.length == 0) {
      return res.status(401).json({ msg: 'Unauthorized to edit recipe' });
    }

    const update = req.body;
    const updatedRecipe = req.body.recipe;
    const updatedIngredients = req.body.ingredients;
    await recipesModel.updateRecipe(updatedRecipe, updatedIngredients, recipeId);

    return res.status(200).json({ update, msg: 'Successfully edited a recipe' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: 'Failed to edit recipe',
      err,
    });
  }
});

router.get('/challenges', verifyUserTokenIfExists, async (req, res) => {
  try {
    const allRecipes = await recipesModel.getOrderedByChallenge();

    const recipeIngredients = await recipeIngredientsModel.getAllRecipeIngredients();
    let completedRecipes = [];
    if (req.userInfo) {
      completedRecipes = await completedRecipesModel.getCompletedRecipes(req.userInfo.userId);
    }
    await Promise.all(await allRecipes.map((recipe) => {
      recipe.ingredientList = recipeIngredients.filter((recipeIngredient) => recipeIngredient.recipeId === recipe.recipeId);
      recipe.completed = completedRecipes.findIndex((completed) => completed.recipeId === recipe.recipeId) !== -1;
    }));

    const challenges = ['Two Spicy', 'Habanero Hero', 'Haunted Bowels', 'I Got the Sauce', 'Spicy Sips'];
    const icon = [
      'assets/images/two-spicy-icon.png',
      'assets/images/habanero-hottie-icon.png',
      'assets/images/haunted-icon.png',
      'assets/images/hotsauce-icon.png',
      'assets/images/spicy-sips-icon.png',
    ];
    const challengesWithRecipes = await Promise.all(challenges.map(async (challenge, index) => {
      const recipeWithChallenge = allRecipes.filter((recipe) => recipe.challenge === challenge);
      const completedRecipesList = req.userInfo !== undefined
        ? await completedRecipesModel.getCompletedChallenges(req.userInfo.userId, challenge) : [];
      const payload = {
        title: challenge,
        total: recipeWithChallenge.length,
        recipes: recipeWithChallenge.map((recipe) => recipe.recipeId),
        recipeObjects: recipeWithChallenge,
        numberCompleted: completedRecipesList.length,
        icon: icon[index],
      };
      return payload;
    }));
    return res.status(200).json({
      challengesWithRecipes,
    });
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
  Get Recipes by challenge
*/
router.get('/challenge/:challenge', verifyUserTokenIfExists, async (req, res) => {
  try {
    const { challenge } = req.params;
    const rows = await recipesModel.getByChallengeJoinIngredients(challenge);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Challenge information not found' });
    }

    const recipes = rows;
    let completedRecipes = [];
    if (req.userInfo) {
      completedRecipes = await completedRecipesModel.getCompletedRecipes(req.userInfo.userId);
    }
    await Promise.all(await recipes.map((recipe) => {
      recipe.ingredientList = rows.filter((recipeIngredient) => recipeIngredient.recipeId === recipe.recipeId);
      recipe.completed = completedRecipes.findIndex((completed) => completed.recipeId === recipe.recipeId) !== -1;
    }));
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
router.get('/spiceRating/:spiceRating', verifyUserTokenIfExists, async (req, res) => {
  try {
    const { spiceRating } = req.params;
    const rows = await recipesModel.getBySpiceRating(spiceRating);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'SpiceRating information not found' });
    }

    const recipes = rows;
    const recipeIngredients = await recipeIngredientsModel.getAllRecipeIngredients();
    let completedRecipes = [];
    if (req.userInfo) {
      completedRecipes = await completedRecipesModel.getCompletedRecipes(req.userInfo.userId);
    }
    await Promise.all(await recipes.map((recipe) => {
      recipe.ingredientList = recipeIngredients.filter((recipeIngredient) => recipeIngredient.recipeId === recipe.recipeId);
      recipe.completed = completedRecipes.findIndex((completed) => completed.recipeId === recipe.recipeId) !== -1;
    }));
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

    const ingredients = newRecipe.ingredientList;
    delete newRecipe.ingredientList;

    await recipesModel.createRecipe(newRecipe, ingredients);
    return res.status(200).json({ newRecipe, msg: 'Successfully created a new recipe' });
  } catch (err) {
    console.error(err);
    return res.status(500)
      .json({ err, data: 'Unable to add recipe' });
  }
});

/** DEL /recipes/:recipeId */
router.delete('/:recipeId', verifyUserToken, async (req, res) => {
  try {
    const { userId } = req.userInfo;
    const { recipeId } = req.params;
    const recipe = await recipesModel.getByUserIdAndRecipeId(userId, recipeId);

    if (recipe.length === 0) {
      return res.status(404).json({ msg: 'Unauthorized to delete recipe' });
    }

    await recipesModel.deleteRecipe(userId, recipeId);
    return res.status(200).json({ msg: 'Delete successful' });
  } catch (err) {
    console.error(err);
    return res.status(500)
      .json({ err, msg: 'Unable to delete recipe' });
  }
});

/** GET /recipes/searchByTitle/:title */
router.get('/searchByTitle/:title', async (req, res) => {
  try {
    // santitize here: string concat thingy
    const inputTitle = req.params.title;
    const title = '%'.concat(inputTitle, '%');

    const recipes = await recipesModel.getByTitle(title);
    return res.status(200).json(recipes);
  } catch (err) {
    console.error(err);
    return res.status(404).json({ err, msg: 'Unable to find recipe with that name' });
  }
});

module.exports = router;
