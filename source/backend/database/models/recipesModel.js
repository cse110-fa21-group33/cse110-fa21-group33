const db = require('../dbConfig');

/**
 * get user information by recipeId
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
 * update recipe information by recipeId
 * @param recipeId
 * @param payload
 * @returns {Promise<awaited Knex.QueryBuilder<TRecord, TResult>>}
 */
 async function updateByRecipeId(recipeId, payload) {
  await db('recipes')
    .update(payload)
    .where({ recipeId });
}

module.exports = { getByRecipeId, updateByRecipeId };
