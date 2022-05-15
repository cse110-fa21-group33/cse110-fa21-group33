const db = require('../dbConfig');

/**
 * get recipe information by recipeId
 * @param recipeId
 * @returns {Promise<awaited Knex.QueryBuilder<TRecord, TResult>>}
 */
async function getByRecipeId(recipeId) {
  const result = await db('recipes')
    .select( '*' )
    .where({ recipeId });
  return result;
}

/**
 * create a recipe
 * @param payload 
 * @param userId
 * @returns 
 */
async function createRecipe(payload, userId) {
  const result = await db('recipes')
    .insert(payload);
}
module.exports = { getByRecipeId };
