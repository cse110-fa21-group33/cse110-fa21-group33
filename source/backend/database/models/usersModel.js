const db = require('../dbConfig');

/**
 * get user information by userId
 * @param userId
 * @returns {Promise<awaited Knex.QueryBuilder<TRecord, TResult>>}
 */
async function getByUserId(userId) {
  const result = await db('users')
    .select('userId', 'email', 'username')
    .where({ userId });
  return result;
}

/**
 * Searches all completed recipes by userId
 * @param userId
 * @returns {Promise<awaited Knex.QueryBuilder<TRecord, TResult>>}
 */
async function getCompletedRecipes(userId){
  const completedRecipes = await db('completedRecipes')
    .innerJoin('recipes', function() {
      this.on('completedRecipes.userId', '=', userId);
      this.andOn('recipes.recipeId', '=', 'completedRecipes.recipeId');
    })
    .select('recipes.*');
  return completedRecipes;
}

/**
 * Searches all saved recipes by userId
 * @param userId
 * @returns {Promise<awaited Knex.QueryBuilder<TRecord, TResult>>}
 */
async function getSavedRecipes(userId){
  const savedRecipes = await db('savedRecipes')
    .innerJoin('recipes', function() {
      this.on('savedRecipes.userId', '=', userId);
      this.andOn('recipes.recipeId', '=', 'savedRecipes.recipeId');
    })
    .select('recipes.*');
  return savedRecipes;
}

module.exports = { getByUserId, getCompletedRecipes, getSavedRecipes };
