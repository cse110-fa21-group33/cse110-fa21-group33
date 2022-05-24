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
 * Get all completed challenges 
 * @param challenge
 * @returns {Promise<awaited Knex.QueryBuilder<TRecord, TResult>>}
 */
 async function getCompletedChallenges(challenge) {
  const completedChallenges = await db('completedRecipes')
    .join('recipes', 'completedRecipes.recipeId', 'recipes.recipeId')
    .select('recipes.*')
    .where('recipes.challenge', challenge)
  return completedChallenges; 
}

// /**
//  * Get all completed challenges 
//  * @param challenge
//  * @returns {Promise<awaited Knex.QueryBuilder<TRecord, TResult>>}
//  */
// async function getCompletedChallenges(userId, challenge) {
//   const completedChallenges = await db('completedRecipes')
//     .join('users', 'completedRecipes.userId', 'users.userId')
//     .join('recipes', 'completedRecipes.recipeId', 'recipes.recipeId')
//     .select('recipes.*')
//     .where({userId, challenge});
//   return completedChallenges; 
// }

module.exports = { getCompletedRecipes, getCompletedChallenges};
