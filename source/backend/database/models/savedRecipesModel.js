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
      .select('userId', 'recipeId', 'email', 'username')
      .where({ savedRecipeId })
      .del();
 }

module.exports = { getByUserIdAndRecipeId, removeById};
