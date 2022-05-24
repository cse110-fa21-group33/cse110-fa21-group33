const db = require('../dbConfig');

/**
 * Searches all saved recipes by userId
 * @param userId
 * @returns {Promise<awaited Knex.QueryBuilder<TRecord, TResult>>}
 */
 async function getSavedRecipes(userId){
  const savedRecipes = await db('savedRecipes')
    .innerJoin('recipes', 'savedRecipes.recipeId', 'recipes.recipeId')
    .where('savedRecipes.userId', userId)
    .select('recipes.*');
  return savedRecipes;
}

module.exports = { getSavedRecipes };

  