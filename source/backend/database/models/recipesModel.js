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
async function createRecipe(payload) {
  const result = await db('recipes')
    .insert(payload);
}

/**
 * remove by user id and recipe id
 * @param userId
 * @param recipeId
 * @return {Promise<void>}
 */
 async function deleteRecipe(userId, recipeId) {
  try {
      await db('recipes')
          .del()
          .where({userId, recipeId});
  } catch (err) {
      console.error(err);
  }
}


module.exports = { getByRecipeId, createRecipe, deleteRecipe };
