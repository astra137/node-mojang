const yggdrasil = require('./endpoints/yggdrasil')

/**
 * Authenticates a user with their mojang credentials.
 *
 * @param {String} username - required. Valid username of a Mojang account
 * @param {String} password - required. Password for the given account
 * @param {String} clientToken - optional. Client token for the request
 * @param {Object} agent - optional. A agent object to get some extra information in the response
 * @param {String} agent.name - The name of the agent. Can be "Minecraft" or "Scrolls"
 * @param {Number} agent.version - Version number of the agent. Use 1 as a default value
 * @param {Boolean} requestUser - optional. True adds the user object to the response
 * @returns {Promise.<Object>} - Promise which resolves to user profile information, clientToken and accessToken
 * @see {@link http://wiki.vg/Authentication#Authenticate} for more detailed information
 */
function authenticate (username, password, clientToken, agent, requestUser) {
  return yggdrasil('/authenticate', {
    body: {
      agent,
      username,
      password,
      clientToken,
      requestUser
    }
  }).then(res => res.body)
}

module.exports = authenticate
