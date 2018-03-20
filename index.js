
exports.status = require('./lib/mojang/status')
exports.getProfile = require('./lib/mojang/get-profile')
exports.getProfileHistory = require('./lib/mojang/get-profile-history')
exports.lookupProfiles = require('./lib/mojang/lookup-profiles')
exports.lookupProfileAt = require('./lib/mojang/lookup-profile-at')
exports.getOrdersStatistics = require('./lib/mojang/get-orders-statistics')

exports.authenticate = require('./lib/yggdrasil/authenticate')
exports.isValid = require('./lib/yggdrasil/is-valid')
exports.refresh = require('./lib/yggdrasil/refresh')
exports.invalidate = require('./lib/yggdrasil/invalidate')
exports.signout = require('./lib/yggdrasil/signout')

exports.isSecure = require('./lib/security/is-secure')
exports.getChallenges = require('./lib/security/get-challenges')
exports.answerChallenges = require('./lib/security/answer-challenges')

exports.getSession = require('./lib/session/get-session')
exports.getBlockedServers = require('./lib/session/get-blocked-servers')

exports.getUser = require('./lib/account/get-user')
exports.setSkin = require('./lib/account/set-skin')
exports.resetSkin = require('./lib/account/reset-skin')
exports.getUserProfiles = require('./lib/account/get-user-profiles')
exports.getUserCapeData = require('./lib/account/get-user-cape-data')

// For document types, prefer dotless Array<Object>
// https://github.com/jsdoc3/jsdoc/issues/1375

/**
  * @typedef {Object} CustomSession
  * @property {String} id - profile UUID
  * @property {String} name - in-game name (IGN)
  * @property {Number} timestamp
  * @property {String} skin - URL of the current skin texture
  * @property {String} cape - URL of the current cape texture
  * @property {Boolean} isSlim - true if profile is using slim model
  */

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
  * @typedef {Object} MojangChallenge
  * @property {Object} answer
  * @property {Number} answer.id - used in {@link answerChallenges}
  * @property {Object} question
  * @property {Number} question.id
  * @property {String} question.question - text to prompt user with
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
