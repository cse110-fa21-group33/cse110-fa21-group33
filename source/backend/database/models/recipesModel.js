const db = require('../dbConfig');

/**
 * get recipe information by recipeId
 * @param recipeId
 * @returns {Promise<awaited Knex.QueryBuilder<TRecord, TResult>>}
 */
async function getByRecipeId(recipeId) {
  const result = await db('recipes')
    .select('*')
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
      await Promise.all(ingredientsArray.map(async (ingredient) => {
        const ingredientId = await db('ingredients')
          .insert(ingredient)
          .transacting(transaction)
          .returning('ingredientId');
        const recipeIngredients = {
          recipeId,
          ingredientId: ingredientId[0],
        };
        await db('recipeIngredients')
          .transacting(transaction)
          .insert(recipeIngredients);
      }));
      await transaction.commit();
    } catch (err) {
      console.log(err);
      await transaction.rollback();
    }
  });
}

/**
 * remove by user id and recipe id
 * @param userId
 * @param recipeId
 * @return {Promise<void>}
 */
async function deleteRecipe(userId, recipeId) {
  await db.transaction(async (transaction) => {
    try {
      await db('recipes')
        .transacting(transaction)
        .where({ userId, recipeId })
        .del();
      await db('savedRecipes')
        .transacting(transaction)
        .where({ userId, recipeId })
        .del();
      await db('completedRecipes')
        .transacting(transaction)
        .where({ userId, recipeId })
        .del();
      await transaction.commit();
    } catch (err) {
      console.log(err);
      await transaction.rollback();
    }
  });
}

/**
 * 
 * @param userId
 * @param recipeId
 * @returns 
 */
async function getByUserIdAndRecipeId(userId, recipeId) {
  const result = await db('recipes')
            .select('*')
            .where({userId, recipeId});
  return result;
}

/*
 * get recipes by challenge
 * @param challenge
 * @returns {Promise<awaited Knex.QueryBuilder<TRecord, TResult>>}
 */
async function getByChallenge(challenge) {
  const result = await db('recipes')
    .select('*')
    .where({ challenge });
  return result;
}

/**
 * get recipes by spiceRating
 * @param spiceRating
 * @returns {Promise<awaited Knex.QueryBuilder<TRecord, TResult>>}
 */
async function getBySpiceRating(spiceRating) {
  const result = await db('recipes')
    .select('*')
    .where({ spiceRating });
  return result;
}

module.exports = {
  getByRecipeId, createRecipe, deleteRecipe, getByChallenge, getBySpiceRating, getByUserIdAndRecipeId
};
