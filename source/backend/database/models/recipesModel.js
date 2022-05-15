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
 * @param 
 * @returns 
 */
module.exports = { getByRecipeId };
