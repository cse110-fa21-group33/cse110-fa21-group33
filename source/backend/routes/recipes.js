const express = require('express');
const recipesModel = require('../database/models/recipesModel');

const router = express.Router();

/* GET /recipes */
router.get('/:id', async (req, res) => {
  res.send('chicken');
  try {
    const { recipeId } = req.params.getByRecipeId;
    //if (parseInt(req.params.id, 10) !== recipeId) {
    //  return res.status(401).json({ message: 'Forbidden, acceess denied' });
    //}
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

module.exports = router;

