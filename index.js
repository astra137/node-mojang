
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
exports.uploadSkin = require('./lib/account/upload-skin')
exports.resetSkin = require('./lib/account/reset-skin')
exports.getUserProfiles = require('./lib/account/get-user-profiles')
exports.getUserCapeData = require('./lib/account/get-user-cape-data')

// For document types, prefer dotless Array<Object>
// https://github.com/jsdoc3/jsdoc/issues/1375

/**
  * @typedef {Object} CustomSession
  * @property {string} id - profile UUID
  * @property {string} name - in-game name (IGN)
  * @property {number} timestamp
  * @property {string} skin - URL of the current skin texture
  * @property {string} cape - URL of the current cape texture
  * @property {boolean} isSlim - true if profile is using slim model
  */

/**
  * @typedef {Object} MojangSession
  * @property {string} clientToken
  * @property {string} accessToken
  * @property {{id: string, name: string}} [selectedProfile]
  * @property {Array<{id: string, name: string}>} [availableProfiles]
  * @property {{id: string}} [user] - always included by {@link authenticate}
  */

/**
  * @typedef {Object} MojangProfile
  * @property {string} id - profile UUID
  * @property {string} agent - minecraft, scrolls
  * @property {string} name - in-game name (IGN)
  * @property {string} userId - user UUID
  * @property {number} createdAt
  * @property {boolean} legacyProfile
  * @property {boolean} deleted
  * @property {boolean} paid
  * @property {boolean} migrated
  */

/**
  * @typedef {Object} MojangChallenge
  * @property {Object} answer
  * @property {number} answer.id - used in {@link answerChallenges}
  * @property {Object} question
  * @property {number} question.id
  * @property {string} question.question - text to prompt user with
  */

/**
  * @typedef {Object} MojangUser
  * @property {string} id - user UUID
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
