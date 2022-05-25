const db = require('../dbConfig');

/**
 * Searches all completed recipes by userId
 * @param userId
 * @returns {Promise<awaited Knex.QueryBuilder<TRecord, TResult>>}
 */
async function getCompletedRecipes(userId){
  const completedRecipes = await db('completedRecipes')
      .innerJoin('recipes', 'completedRecipes.recipeId', 'recipes.recipeId')
      .where('completedRecipes.userId', userId)
      .select('recipes.*');
  return completedRecipes;
}

/**
 *  Adds a new recipe to the user's completed list by recipeID
 * @param recipeId
 * @returns {Promise<awaited Knex.QueryBuilder<TRecord, TResult>>}
 */
async function insert(recipeId, userId){
  const updatedRecipeList = await db('completedRecipes')
      .insert({userId, recipeId});
}

module.exports = { getCompletedRecipes, insert };