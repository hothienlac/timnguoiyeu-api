const jwt = require('app/utils/jwt');
const jwtDecode = require('jsonwebtoken').decode;
const User = require('app/modules/user/model');
const httpStatus = require('http-status');
const APIError = require('app/utils/APIError');

const apiError = new APIError({
  message: 'Unauthorized',
  status: httpStatus.UNAUTHORIZED,
  stack: undefined,
});

/**
 * Verify function for Passport HTTP Bearer Strategy
 * @param {string} token token to be verified
 * @param {function(error, user)} done callback function
 */
const verify = async (token, done) => {
  try {
    // Check whether token is valid
    const tempDecoded = jwtDecode(token, {json: true});
    if (!tempDecoded) {
      throw apiError;
    }

    // Incase of using deleted user token
    const tempUser = await User.findOne({_id: tempDecoded.sub}).exec();
    if (!tempUser) {
      throw apiError;
    }

    // Decode
    const decoded = await jwt.verify('accessToken', tempUser)(token);
    if (!decoded) {
      throw apiError;
    }

    const user = await User.findOne({_id: decoded.sub})
        .select('-secret -password -oauth').exec();
    return done(null, user);
  } catch (err) {
    return done(err);
  }
};

module.exports = verify;
