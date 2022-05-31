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


/**
 * get user information by username or email
 * @param email
 * @returns {Promise<awaited Knex.QueryBuilder<TRecord, TResult>>}
 */
 async function getByUsernameOrEmail(username, email) {
  const result = await db('users')
    .select('username', 'email')
    .where({ username, email });
  return result;
}


/**
  * create user
  * @param payload
  * @returns
  */
 async function createUser(payload) {
  await db.transaction(async (transaction) => {
    try {
      await db('users')
        .insert(payload)
        .transacting(transaction)
        .returning('userId');
      await transaction.commit();
    } catch (err) {
      console.log(err);
      await transaction.rollback();
    }
  });
}

module.exports = { getByUserId, getByUsername, getByUsernameOrEmail, createUser };
