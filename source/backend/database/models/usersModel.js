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

/**
 * get user information by username
 * @param username
 * @param userId
 * @returns {Promise<awaited Knex.QueryBuilder<TRecord, TResult>>}
 */
async function getByUsername(username) {
  const result = await db('users')
    .select('username', 'userId', 'password')
    .where({ username });
  return result;
}

module.exports = { getByUserId, getByUsername };
