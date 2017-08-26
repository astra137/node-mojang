const got = require('got')
const {USER_AGENT, YGGDRASIL_API} = require('../constants')
const handle = require('./handle-response')

/**
 * Authenticates a user with their Mojang credentials.
 *
 * @param {String} username - required. Valid username of a Mojang account
 * @param {String} password - required. Password for the given account
 * @param {String} clientToken - optional. Client token for the request
 * @param {Object} agent - optional. If valid, adds selectedProfile to response
 * @param {String} agent.name - The name of the agent. Can be "Minecraft" or "Scrolls"
 * @param {Number} agent.version - Version number of the agent. Use 1 as a default value
 * @returns {Promise.<Object>} - Promise which resolves to a session {clientToken, accessToken, selectedProfile, user}
 * @see {@link http://wiki.vg/Authentication#Authenticate}
 */
function authenticate (username, password, clientToken, agent) {
  return handle(got(`${YGGDRASIL_API}/authenticate`, {
    headers: { 'user-agent': USER_AGENT },
    json: true,
    body: {
      agent,
      username,
      password,
      clientToken,
      requestUser: true
    }
  }))
}

module.exports = authenticate
