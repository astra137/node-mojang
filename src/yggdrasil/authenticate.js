const got = require('got')
const {USER_AGENT, YGGDRASIL_API} = require('../constants')
const handle = require('./handle-response')

/**
 * Authenticates a user with their Mojang credentials.
 *
 * @param {String} username - username (email) of a Mojang account
 * @param {String} password - password for the given account
 * @param {String} [clientToken] - server will generate a client token if empty
 * @param {Object} [agent] - if valid, adds `selectedProfile` to response
 * @param {String} agent.name - name of the agent ('Minecraft' or 'Scrolls')
 * @param {Number} agent.version - version number of the agent (use `1`)
 * @returns {Promise.<Object>} resolves to a session {clientToken, accessToken, selectedProfile, user}
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
