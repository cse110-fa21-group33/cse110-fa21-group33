const userTokenUtil = require('../auth/tokenUtil');
/**
 * verifies user token in cookie, save it into req.userInfo if exists
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
async function verifyUserTokenIfExists(req, res, next) {
  try {
    // Get auth header value
    const bearerHeader = req.headers.authorization;
    // Check if bearer is undefined
    if (typeof bearerHeader === 'undefined') {
      next();
      return;
    }
    // Split at the space
    const bearer = bearerHeader.split(' ');
    // Get token from array
    const bearerToken = bearer[1];

    const userInfo = bearerToken ? await userTokenUtil.validateToken(bearerToken) : null;
    if (userInfo === null) {
      next();
      return;
    }
    req.userInfo = userInfo.userInfo;
    next();
  } catch (err) {
    next();
  }
}

module.exports = verifyUserTokenIfExists;
