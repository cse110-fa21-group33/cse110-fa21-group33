const db = require('../dbConfig');

/**
 * get user information by userId and recipeId
 * @param userId
 * @param recipeId
 * @returns {Promise<awaited Knex.QueryBuilder<TRecord, TResult>>}
 */
 async function getByUserIdAndRecipeId (userId, recipeId) {
    const result = await db('savedRecipes')
    .join('users', 'users.userId', 'savedRecipes.userId')
    .join('recipes', 'recipes.recipeId', 'savedRecipes.recipeId')
    .select('userId', 'recipeId', 'email', 'username')
    .where({ userId, recipeId });
    return result
}
    
/**
 * delete savedRecipe record by recipeId
 * @param userId
 * @param savedRecipeId
 */
 async function deleteByUserIdAndSavedRecipeId(userId, savedRecipeId) {
    await db('savedRecipes') 
      .where({ userId, savedRecipeId })
      .del();
 }

/**
 * Searches all saved recipes by userId
 * @param userId
 * @returns {Promise<awaited Knex.QueryBuilder<TRecord, TResult>>}
 */
 async function getByUserIdJoinRecipes(userId) {
  const savedRecipes = await db('savedRecipes')
    .innerJoin('recipes', 'savedRecipes.recipeId', 'recipes.recipeId')
    .where('savedRecipes.userId', userId)
    .select('recipes.*');
  return savedRecipes;
}

/**
 * @param userId
 * @param recipeId
 * @returns 
 */
async function addSavedRecipe(userId, recipeId) {
  await db('savedRecipes')
    .insert({userId, recipeId});
}

async function getSavedRecipeByUserIdAndRecipeId(userId, recipeId) {
  return await db('savedRecipes')
    .select('*')
    .where({userId, recipeId});
}

module.exports = { getByUserIdJoinRecipes, getByUserIdAndRecipeId, deleteByUserIdAndSavedRecipeId, addSavedRecipe, getSavedRecipeByUserIdAndRecipeId };
