const db = require('../dbConfig');

/**
 * get user information by userId and recipeId
 * @param userId
 * @param recipeId
 * @returns {Promise<awaited Knex.QueryBuilder<TRecord, TResult>>}
 */
 async function getByUserIdAndRecipeId (userId, recipeId) {
    const result = await db('users')
      .select('userId', 'recipeId', 'email', 'username')
      .where({ userId, recipeId });
    return result;
}
    
/**
 * delete user information by recipeId
 * @param savedRecipeId
 */
 async function removeById(savedRecipeId) {
    const result = await db('recipes') 
      .select('userId', 'recipeId', 'email', 'username')
      .where({ savedRecipeId })
      .del();
 }

module.exports = { getByUserIdAndRecipeId, removeById};
