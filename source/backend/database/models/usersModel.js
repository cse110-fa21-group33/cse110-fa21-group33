const db = require('../dbConfig');

/**
 * get user information by userId
 * @param userId
 * @returns {Promise<awaited Knex.QueryBuilder<TRecord, TResult>>}
 */
async function getByUserId(userId) {
  const result = await db('users')
    .select('userId', 'email', 'username')
    .where({ userId });
  return result;
}

module.exports = { getByUserId };
