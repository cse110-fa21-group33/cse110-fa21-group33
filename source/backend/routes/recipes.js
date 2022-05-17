const express = require('express');
const recipesModel = require('../database/models/recipesModel');

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
router.post('/', async (req, res) => {
  try {
      const new_rec = req.body;
      const {userId} = req.userInfo;
      await recipesModel.createRecipe(new_rec, userId);
      return res.redirect('/');
  } catch (err) {
      console.error(err);
      return res.status(500)
          .json({err, data: 'Unable to add recipe'});
  }
});

router.delete('/recipes/:recipeId', async (req, res) => {
  try {
    const {userId} = req.userInfo;
    const recipeId = req.params.id;
    await recipesModel.deleteRecipe(userId, recipeId);
    return res.redirect('/');
  } catch (err) {
    console.error(err);
    return res.status(500)
          .json({err, data: 'Unable to delete recipe'});
  }
});

module.exports = router;

