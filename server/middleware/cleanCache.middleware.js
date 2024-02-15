const {clearHash} = require('../utils/cache')

module.exports = (keys) => {
  return async (req, res, next) => {
    await next();
    keys.forEach(key => clearHash(key));
  }
}