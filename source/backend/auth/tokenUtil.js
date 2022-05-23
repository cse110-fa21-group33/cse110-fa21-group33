const jwt = require('jsonwebtoken');

/**
 * Takes a token string, validates it, and then decode it into
 * it's original json object
 * @param token
 * @returns {Promise<authData>}
 */
async function validateToken(token) {
  return jwt.verify(token, process.env.USERTOKENKEY, async (err, authData) => {
    if (err) {
      console.log(err);
    } else {
      return authData;
    }
  });
}

/**
 * Generates a new token string with the spot info json parameter
 * @param spotInfo
 * @returns {Promise<string*>}
 */
async function generateToken(userInfo) {
  return jwt.sign({ userInfo }, process.env.USERTOKENKEY);
}

module.exports = {
  validateToken,
  generateToken,
};
