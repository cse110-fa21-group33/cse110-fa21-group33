const express = require('express');
const usersModel = require('../database/models/usersModel');
const savedRecipesModel = require('../database/models/savedReceipesModel');

const router = express.Router();

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

    await savedRecipesModel.removeById(rowResult[0]); 
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

module.exports = router;
