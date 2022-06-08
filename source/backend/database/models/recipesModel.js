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
      console.error(err);
      await transaction.rollback();
    }
  });
}

/**
 * update recipe by recipe id
 * @param payload
 * @param recipeId
 * @returns
 */
async function updateRecipe(updatedRecipe, updatedIngredients, recipeId) {
  await db.transaction(async (transaction) => {
    try {
      // Gets current recipes
      const ingredientsArray = await db('recipeIngredients')
        .select('*')
        .where({ recipeId });
      // Deletes all old ingredients from ingredients and recipeIngredients table
      await Promise.all(ingredientsArray.map(async (ingredient) => {
        await db('recipeIngredients')
          .transacting(transaction)
          .where({
            recipeId,
            ingredientId: ingredient.ingredientId,
          })
          .del();
        await db('ingredients')
          .transacting(transaction)
          .where({ ingredientId: ingredient.ingredientId })
          .del();
      }));
      // Adds all the new ingredients to ingredients and recipeIngredients table
      await Promise.all(updatedIngredients.map(async (ingredient) => {
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
    } catch (err) {
      console.log(err);
      await transaction.rollback();
    }
  });
  await db('recipes')
    .update(updatedRecipe)
    .where({ recipeId });
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
      const ingredientsArray = await db('recipeIngredients')
        .select('*')
        .where({ recipeId });

      await db('recipeIngredients')
        .transacting(transaction)
        .where({ recipeId })
        .del();

      // you will have an array filled with ingredient ids: eg [1, 2, 3...]
      const ingredientIds = await Promise.all(ingredientsArray.map((recipeIngredient) => recipeIngredient.ingredientId));

      await db('ingredients')
        .transacting(transaction)
        .whereIn('ingredientId', ingredientIds)
        .del();
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
 * get all recipes by userid and recipeid
 * @param userId
 * @param recipeId
 * @returns
 */
async function getByUserIdAndRecipeId(userId, recipeId) {
  const result = await db('recipes')
    .select('*')
    .where({ userId, recipeId });
  return result;
}

/**
 * get recipe by challenge
 * @param challenge
 * @returns
 */
async function getByChallengeJoinIngredients(challenge) {
  const result = await db('recipes')
    .join('recipeIngredients', 'recipeIngredients.recipeId', 'recipes.recipeId')
    .join('ingredients', 'recipeIngredients.ingredientId', 'ingredients.ingredientId')
    .select('*')
    .where('recipes.challenge', challenge);
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

/**
 * Get recipes with title
 * @param title
 * @returns {Promise<awaited Knex.QueryBuilder<TRecord, TResult>>}
 */
async function getByTitle(title) {
  const result = await db('recipes')
    .select('*')
    .whereRaw('title LIKE ?', title);
  return result;
}

/**
 * get all recipes ordered by challenge
 * @returns {Promise<awaited Knex.QueryBuilder<TRecord, TResult>>}
 */
async function getOrderedByChallenge() {
  const result = await db('recipes')
    .select('*')
    .orderBy('challenge');
  return result;
}

module.exports = {
  getByRecipeId, createRecipe, deleteRecipe, updateRecipe, getByChallengeJoinIngredients, getBySpiceRating, getByUserIdAndRecipeId, getOrderedByChallenge, getByTitle,
};
