const db = require('../dbConfig');

/**
 * Searches all completed recipes by userId
 * @param userId
 * @returns {Promise<awaited Knex.QueryBuilder<TRecord, TResult>>}
 */
async function getCompletedRecipes(userId){
  const completedRecipes = await db('completedRecipes')
      .innerJoin('recipes', 'completedRecipes.recipeId', 'recipes.recipeId')
      .where('completedRecipes.userId', userId)
      .select('recipes.*');
  return completedRecipes;
}

/**
 *  Adds a new recipe to the user's completed list by recipeID
 * @param recipeId
 * @returns {Promise<awaited Knex.QueryBuilder<TRecord, TResult>>}
 */
 async function addNewRecipe(recipeId, userId){
  
  await db.transaction(async (transaction) => {
    try {
      await db('completedRecipes')
            .transacting(transaction)
            .where({userId, recipeId})
            .insert();
      await transaction.commit();
    } catch (err) {
      console.log(err);
      await transaction.rollback();
    }
  });
  
  const updatedRecipeList = await db('completedRecipes')
      .where('updatedRecipeList.recipeId', recipeId)
      .insert({ recipeId })
      .select('recipes.*');
    return updatedRecipeList;
}

module.exports = { getCompletedRecipes, addNewRecipe };