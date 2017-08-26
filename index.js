exports.getNameHistory = require('./src/mojang/get-name-history')
exports.getProfileAt = require('./src/mojang/get-profile-at')
exports.getUserProfiles = require('./src/mojang/get-user-profiles')
exports.getUser = require('./src/mojang/get-user')

exports.getProfile = require('./src/session/get-profile')

exports.check = require('./src/status/check')

exports.authenticate = require('./src/yggdrasil/authenticate')
exports.invalidate = require('./src/yggdrasil/invalidate')
exports.refresh = require('./src/yggdrasil/refresh')
exports.signout = require('./src/yggdrasil/signout')
exports.validate = require('./src/yggdrasil/validate')

/**
  * @typedef {Object} MojangProfile
  * @property {String} id - unique profile ID
  * @property {String} agent - minecraft, scrolls
  * @property {String} name - in-game name (IGN)
  * @property {String} userId
  * @property {Number} createdAt
  * @property {Boolean} legacyProfile
  * @property {Boolean} deleted
  * @property {Boolean} paid
  * @property {Boolean} migrated
  */

/**
  * @typedef {Object} MojangUser
  * @property {String} id - unique user ID
  * @property {String} email
  * @property {String} firstName
  * @property {String} lastName
  * @property {String} username
  * @property {String} registerIp
  * @property {String} migratedFrom
  * @property {Number} migratedAt
  * @property {Number} registeredAt
  * @property {Number} passwordChangedAt
  * @property {Number} dateOfBirth
  * @property {Boolean} deleted
  * @property {Boolean} blocked
  * @property {Boolean} secured
  * @property {Boolean} migrated
  * @property {Boolean} emailVerified
  * @property {Boolean} legacyUser
  * @property {Boolean} verifiedByParent
  * @property {String} fullName
  * @property {Boolean} fromMigratedUser
  * @property {Boolean} hashed
  */
