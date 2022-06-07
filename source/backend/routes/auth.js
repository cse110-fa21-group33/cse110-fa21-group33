const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const tokenUtil = require('../auth/tokenUtil');
const usersModel = require('../database/models/usersModel');

const router = express.Router();

/*
  Find username and password (hashed by bcrypt or some other hash functions)
  Check if the above combo exists:
   Yes:
       Return a JWT Token (with the userId, and username)
   No:
       Return 404 (not found)
*/
router.post('/login', async (req, res) => {
  try {
    const {
      username,
      password,
    } = req.body;

    // ensure user info is entered
    if (!username || !password) {
      return res.status(400)
        .json({ message: 'Username and password are requried.' });
    }

    // find user
    const rows = await usersModel.getByUsername(username);
    const foundPassword = rows[0].password;
    // evaluate passwords
    const isPasswordMatched = bcrypt.compareSync(password, foundPassword);

    // determine if user exists in database
    if (rows.length === 0 || !isPasswordMatched) {
      return res.status(404)
        .json({ message: 'User information not found' });
    }

    // get userId and password
    const user = {
      userId: rows[0].userId,
      password: rows[0].password,
    };

    // return JWT token
    const accessToken = await tokenUtil.generateToken(user);
    return res.status(200)
      .json({ accessToken });
  } catch (err) {
    console.error(err);
    return res.status(503).json({
      message: 'Failed to login due to internal error',
      err,
    });
  }
});

/* POST /signup */
/* Creates new user in database with username, password and email -> unique user/email
required */
router.post('/signup', async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const hashedPwd = bcrypt.hashSync(password, null, null);

    /* check whether username and email exists in the database */
    const existingUsers = await usersModel.getByUsernameOrEmail(username, email);

    if (existingUsers.length !== 0) {
      return res.status(401).json({ msg: 'Signup failed, Username or email already exisits' });
    }

    /* create new user */
    const newUser = { username, password: hashedPwd, email };

    /* insert user into database */
    await usersModel.createUser(newUser);
    return res.status(200).json({ newUser, msg: 'Successfully created a new user' });
  } catch (err) {
    console.error(err);
    return res.status(503).json({
      message: 'Failed to register new user',
      err,
    });
  }
});

module.exports = router;
