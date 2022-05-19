const express = require('express');
const usersModel = require('../database/models/usersModel');
const completedRecipesModel = require('../database/models/completedRecipesModel');
const savedRecipesModel = require('../database/models/savedRecipesModel');

const router = express.Router();

/* GET users/completedRecipes */
router.get('/completedRecipes', async (req, res) => {
  try {
    const { userId } = req.userInfo;
    const completedRecipesList = await completedRecipesModel.getCompletedRecipes(userId);
    return res.status(200).json(completedRecipesList);
  } catch (err) {
    console.error(err);
    return res.status(503).json({
      message: 'Failed to get completed recipes',
      err
    });
  }
});

/* GET users/savedRecipes */
router.get('/savedRecipes', async (req, res) => {
  try {
    const { userId }  = req.userInfo;
    const savedRecipesList = await savedRecipesModel.getSavedRecipes(userId);
    return res.status(200).json(savedRecipesList);
  } catch (err) {
    console.error(err);
    return res.status(503).json({
      message: 'Failed to get saved recipes',
      err
    });
  }
});

/* GET /users */
router.get('/:id', async (req, res) => {
  try {
    const { userId } = req.userInfo;
    if (parseInt(req.params.id, 10) !== userId) {
      return res.status(401).json({ message: 'Forbidden, acceess denied' });
    }
    const rows = await usersModel.getByUserId(userId);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'User information not found' });
    }

    const user = rows[0];
    return res.status(200).json(user);
  } catch (err) {
    console.error(err);
    return res.status(503).json({
      message: 'Failed to get user information due to'
        + 'internal server error',
      err,
    });
  }
});

module.exports = router;
