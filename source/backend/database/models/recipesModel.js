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

module.exports = { getByRecipeId };

/**
 * get recipes by challenge
 * @param challenge
 * @returns {Promise<awaited Knex.QueryBuilder<TRecord, TResult>>}
 */
 async function getByChallenge(challenge) {
  const result = await db('recipes')
    .select( '*' )
    .where({ challenge });
  return result;
}

module.exports = { getByChallenge };

/**
 * get recipes by spiceRating
 * @param spiceRating
 * @returns {Promise<awaited Knex.QueryBuilder<TRecord, TResult>>}
 */
 async function getBySpiceRating(spiceRating) {
  const result = await db('recipes')
    .select( '*' )
    .where({ spiceRating });
  return result;
}

module.exports = { getBySpiceRating };
