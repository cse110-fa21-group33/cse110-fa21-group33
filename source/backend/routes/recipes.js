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
router.post('/', async(req, res) => {
  try {
    
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

