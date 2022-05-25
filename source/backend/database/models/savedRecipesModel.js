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
 * @param savedRecipeId
 */
 async function removeById(savedRecipeId) {
    const result = await db('recipes') 
      .where({ savedRecipeId })
      .del();
 }

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

module.exports = { getSavedRecipes, getByUserIdAndRecipeId, removeById };
