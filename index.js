exports.getNameHistory = require('./src/mojang/get-name-history')
exports.getUserInfo = require('./src/mojang/get-user-info')
exports.getUuidAt = require('./src/mojang/get-uuid-at')

exports.getProfile = require('./src/session/get-profile')

exports.check = require('./src/status/check')

exports.authenticate = require('./src/yggdrasil/authenticate')
exports.invalidate = require('./src/yggdrasil/invalidate')
exports.refresh = require('./src/yggdrasil/refresh')
exports.signout = require('./src/yggdrasil/signout')
exports.validate = require('./src/yggdrasil/validate')

/**
  * @typedef {Object} MojangUser
  * @property {string} id - A unique user ID
  * @property {string} email
  * @property {string} firstName
  * @property {string} lastName
  * @property {string} username
  * @property {string} registerIp
  * @property {string} migratedFrom
  * @property {number} migratedAt
  * @property {number} registeredAt
  * @property {number} passwordChangedAt
  * @property {number} dateOfBirth
  * @property {boolean} deleted
  * @property {boolean} blocked
  * @property {boolean} secured
  * @property {boolean} migrated
  * @property {boolean} emailVerified
  * @property {boolean} legacyUser
  * @property {boolean} verifiedByParent
  * @property {string} fullName
  * @property {boolean} fromMigratedUser
  * @property {boolean} hashed
  */
