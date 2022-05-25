const userTokenUtil = require('../auth/tokenUtil');
/**
 * verifies user token in cookie, save it into req.lotInfo if exists
 * @param req
 * @param res
 * @param next
 * @returns {Promise<void>}
 */
async function verifyUserToken(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers.authorization;
  // Check if bearer is undefined
  if (typeof bearerHeader !== 'undefined') {
    // Split at the space
    const bearer = bearerHeader.split(' ');
    // Get token from array
    const bearerToken = bearer[1];
    console.log(bearerToken);
    const userInfo = bearerToken ? await userTokenUtil.validateToken(bearerToken) : null;
    if (userInfo) {
      req.userInfo = userInfo.userInfo;
      next();
    } else {
      res.status(404)
        .json({ status: 'failed', data: 'Session over' });
    }
  } else {
    // Forbidden
    res.status(403)
      .json({ status: 'failed', data: 'Forbidden' });
  }
}

module.exports = verifyUserToken;
