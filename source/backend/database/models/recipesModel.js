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
 * @param ingredientsArray
 * @returns
 */
async function createRecipe(payload, ingredientsArray) {
  await db.transaction(async (transaction) => {
    try {
      const recipeId = await db('recipes')
                .insert(payload)
                .transacting(transaction)
                .returning('recipeId');
      await ingredientsArray.map(async (ingredient) => {
        const ingredientId = await db('ingredients')
          .insert(ingredient)
          .transacting(transaction)
          .returning('ingredientId');
        const recipeIngredients = {
          recipeId: recipeId,
          ingredientId: ingredientId
        }
        await db('recipeIngredients')
          .transacting(transaction)
          .insert(recipeIngredients)
      });
      await transaction.commit();
    } catch (err) {
      console.log(err);
          await transaction.rollback();
    }
  });

    // if the insert if successful: then lets insert all the ingredients into the ing tbl, then if that's successful do it for the recipe-ing tbl
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
          .where({userId, recipeId})
          .del();
  } catch (err) {
      console.error(err);
  }
}


module.exports = { getByRecipeId, createRecipe, deleteRecipe };
