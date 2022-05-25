const express = require('express');
const usersModel = require('../database/models/usersModel');
const completedRecipesModel = require('../database/models/completedRecipesModel');
const savedRecipesModel = require('../database/models/savedRecipesModel');

const bcrypt = require('bcrypt');

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

/* DELETE /user/savedRecipes */
router.delete('/:savedRecipeId', async (req, res) => {
  try {
    const { userId } = req.userInfo;
    const { recipeId } = req.recipeInfo;
    if (parseInt(req.params.id, 10) !== userId) {
      return res.status(401).json({ message: 'Forbidden, acceess denied' });
    }

    const row = await savedRecipesModel.getByUserIdAndRecipeId(userId, recipeId);
    if (row.length <= 0) {
      return res.status(404).json({ message: 'User information not found' });
    }

    await savedRecipesModel.removeById(row[0].savedRecipeId); 
    return res.status(200).json("Removed successfully");
    
  } catch (err) {
    console.error(err);
    return res.status(503).json({
      message: 'Failed to get user information due to'
        + 'internal server error',
      err,
    });
  }
});

/* POST /auth/signup */
/* Creates new user in database with username, password and email -> unique user/email 
required */
router.post('/auth/signup', async (req, res) => {
  try{
    const { username } = req.username;
    const { password } = req.password;
    const hashedPwd = await bcrypt.hash(password, 10);
    const { email } = req.email;

    /* check username and email are unique */
    const checkUser = await usersModel.getByUsername(username);
    const checkEmail = await usersModel.getByEmail(email);

    if (checkUser.length != 0) {
      // not sure if status number is correct, 409 = conflict
      return res.status(409).json({msg: "Username already exists"})
    }
    if ( checkEmail.length != 0) {
      // not sure if status number is correct, 409 = conflict
      return res.status(409).json({msg: "E-mail already in use"})
    }

    /* TODO: create new user */ 
    const newUser = req.body.user;
    newUser.password = hashedPwd;

    /* TODO: insert user into database */
    await usersModel.createUser(newUser);

    return res.status(200).json({ newUser, msg: 'Successfully created a new user' });

  } catch (err) {
    console.error(err);
    return res.status(503).json({
      message: 'Failed to register new user',
      err,
    });
  }
});

module.exports = router;
