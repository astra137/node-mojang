exports.check = require('./src/status/check')

exports.getNameHistory = require('./src/mojang/get-name-history')
exports.getProfileAt = require('./src/mojang/get-profile-at')
exports.getProfiles = require('./src/mojang/get-profiles')

exports.authenticate = require('./src/yggdrasil/authenticate')
exports.isValid = require('./src/yggdrasil/is-valid')
exports.refresh = require('./src/yggdrasil/refresh')
exports.invalidate = require('./src/yggdrasil/invalidate')
exports.signout = require('./src/yggdrasil/signout')

exports.isSecure = require('./src/security/is-secure')
exports.getChallenges = require('./src/security/get-challenges')
exports.answerChallenges = require('./src/security/answer-challenges')

exports.getSession = require('./src/session/get-session')
exports.getBlockedServers = require('./src/session/get-blocked-servers')

exports.getUser = require('./src/mojang/get-user')
exports.setSkin = require('./src/mojang/set-skin')
exports.resetSkin = require('./src/mojang/reset-skin')

exports.getUserProfiles = require('./src/mojang/get-user-profiles')
exports.getUserCapeData = require('./src/mojang/get-user-cape-data')

// For document types, prefer dotless Array<Object>
// https://github.com/jsdoc3/jsdoc/issues/1375

/**
  * @typedef {Object} MojangSession
  * @property {String} clientToken
  * @property {String} accessToken
  * @property {{id: String, name: String}} [selectedProfile]
  * @property {Array<{id: String, name: String}>} [availableProfiles]
  * @property {{id: String}} [user] - always included by {@link authenticate}
  */

/**
  * @typedef {Object} MojangProfile
  * @property {String} id - profile UUID
  * @property {String} agent - minecraft, scrolls
  * @property {String} name - in-game name (IGN)
  * @property {String} userId - user UUID
  * @property {Number} createdAt
  * @property {Boolean} legacyProfile
  * @property {Boolean} deleted
  * @property {Boolean} paid
  * @property {Boolean} migrated
  */

/**
  * @typedef {Object} MojangUser
  * @property {String} id - user UUID
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
