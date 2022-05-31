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
 * Get all completed challenges 
 * @param challenge
 * @returns {Promise<awaited Knex.QueryBuilder<TRecord, TResult>>}
 */
async function getCompletedChallenges(userId, challenge) {
  const completedChallenges = await db('completedRecipes')
    .join('recipes', 'completedRecipes.recipeId', 'recipes.recipeId')
    .select('recipes.*')
    .where('completedRecipes.userId', userId)
    .where('recipes.challenge', challenge);
  return completedChallenges; 
}

/**
 *  Adds a new recipe to the user's completed list by recipeID
 * @param recipeId
 * @param userId
 * @returns {Promise<awaited Knex.QueryBuilder<TRecord, TResult>>}
 */
async function addToCompletedList(recipeId, userId) {
  await db('completedRecipes')
        .insert({userId, recipeId});
}

/**
 * @param recipeId 
 * @param userId 
 * @returns 
 */
async function getByRecipeIdAndUserId(recipeId, userId) {
  return await db('completedRecipes')
        .select('*')
        .where({recipeId, userId});
}

module.exports = { getCompletedRecipes, addToCompletedList, getByRecipeIdAndUserId, getCompletedChallenges };

