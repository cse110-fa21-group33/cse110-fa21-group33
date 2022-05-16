const db = require('../dbConfig');

/**
 * get saved recipe by userId and recipeId
 * @param  userId 
 * @param  recipeId 
 * @returns {Promise<awaited Knex.QueryBuilder<TRecord, TResult>>}
 */
async function getByUserIdAndRecipeId (userId, recipeId) {
    const result = await db('savedRecipes')
        .join('users', 'users.userId', 'savedRecipes.userId')
        .join('recipes', 'recipes.recipeId', 'savedRecipes.recipeId')
        .select('userId', 'recipeId', 'email', 'username')
        .where({ userId, recipeId });
    return result;
}

module.exports = { getByUserIdAndRecipeId };