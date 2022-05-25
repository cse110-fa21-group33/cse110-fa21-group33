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
 * @returns {Promise<awaited Knex.QueryBuilder<TRecord, TResult>>}
 */
 async function getByUsername(username) {
  const result = await db('users')
    .select('userId', 'email', 'username')
    .where({ username });
  return result;
}

/**
 * get user information by email
 * @param email
 * @returns {Promise<awaited Knex.QueryBuilder<TRecord, TResult>>}
 */
 async function getByEmail(email) {
  const result = await db('users')
    .select('userId', 'email', 'username')
    .where({ email });
  return result;
}



/**
  * create a recipe
  * @param payload
  * @returns
  */
 async function createUser(payload) {
  await db.transaction(async (transaction) => {
    try {
      const userId = await db('users')
        .insert(payload)
        .transacting(transaction)
        .returning('recipeId');
      await transaction.commit();
    } catch (err) {
      console.log(err);
      await transaction.rollback();
    }
  });
}

module.exports = { getByUserId, getByUsername, getByEmail, createUser };
