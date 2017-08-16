'use strict'

const request = require('./_request')

/**
 * Authenticates a user with their mojang credentials.
 *
 * @param {String} username - required. Valid username of a Mojang account
 * @param {String} password - required. Password for the given account
 * @param {String} clientToken - optional. Client token for the request
 * @param {Object} appAgent - A agent object to get some extra information in the response
 * @param {String} appAgent.name - The name of the agent. Can be "Minecraft" or "Scrolls"
 * @param {Number} appAgent.version - Version number of the agent. Use 1 as a default value
 * @returns {Promise.<Object>} - Promise which resolves to user profile information, clientToken and accessToken
 * @see {@link http://wiki.vg/Authentication#Authenticate} for more detailed information
 */
function auth (username, password, clientToken, appAgent) {
  return request({
    method: 'POST',
    hostname: 'authserver.mojang.com',
    path: '/authenticate'
  }, {
    username: username,
    password: password,
    clientToken: clientToken,
    agent: appAgent
  })
}

module.exports = auth
