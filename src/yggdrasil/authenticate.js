const got = require('got')
const onApiError = require('../on-api-error')
const {USER_AGENT, YGGDRASIL_API} = require('../constants')

/**
 * Authenticates a user with their Mojang credentials.
 *
 * *Use `agent` if session is for a game client, ie. a Minecraft launcher.*
 *
 * **Handle access tokens securely.**
 *
 * @param {String} username - username (email) of a Mojang account
 * @param {String} password - password for the given account
 * @param {String} [clientToken] - server will generate a client token if empty
 * @param {Object} [agent] - if valid, adds `selectedProfile` to response
 * @param {String} agent.name - name of the agent ('Minecraft' or 'Scrolls')
 * @param {Number} agent.version - version number of the agent (use `1`)
 * @returns {Promise<MojangSession>} resolves if credentials are valid
 * @see {@link http://wiki.vg/Authentication#Authenticate}
 * @example
 * const clientToken = await savedSettings.read('clientToken')
 * const agent = {name: 'Minecraft', version: 1}
 * const session = await mojang.authenticate(username, password, clientToken, agent)
 * await savedSettings.write('accessToken', session.accessToken)
 * await savedSettings.write('profileUuid', session.selectedProfile.id)
 * console.debug('profile name', session.selectedProfile.name)
 * console.debug('user id', session.user.id)
 */
function authenticate (username, password, clientToken, agent) {
  return got(`${YGGDRASIL_API}/authenticate`, {
    headers: { 'user-agent': USER_AGENT },
    json: true,
    body: {
      agent,
      username,
      password,
      clientToken,
      requestUser: true
    }
  })
    .catch(onApiError)
    .then(res => res.body)
}

module.exports = authenticate
