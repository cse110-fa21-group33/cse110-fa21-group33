const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../database/dbConfig');
const router = express.Router();

/**
 * get user information by username
 * @param username
 * @returns {Promise<awaited Knex.QueryBuilder<TRecord, TResult>>}
 */
 async function getUserByUsername(username) {
  const result = await db('users')
    .select('username', 'userId', 'password')
    .where({ username });
  return result;
}


/* GET /auth */
router.get('/', (req, res) => {
  return res.status(200).json({msg: 'passed'});
});


/*
  Find username and password (hashed by bcrypt or some other hash functions)
  Check if the above combo exists:
   Yes:
       Return a JWT Token (with the userId, and username)
   No:
       Return 404 (not found)
*/
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // ensure user info is entered 
  if (!username || !password) return res.status(400).json({ 'message': 'Username and password are requried.' });
  
  // find user
  const rows = await getUserByUsername(username);
  const foundPassword = rows[0]['password'];
  
  // evaluate passwords
  const match = await bcrypt.compare(password, foundPassword);

  // determine if user exists in database
  if (rows.length === 0 || !match) {
    return res.status(404).json({ message: 'User information not found' });
  }
  
  // get userId and password
  const user = { userId: rows[0]['userId'], password: rows[0]['password'] };

  // return JWT token
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
  return res.status(200).json({ accessToken: accessToken });
});

module.exports = router;
