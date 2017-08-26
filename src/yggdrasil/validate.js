const got = require('got')
const {USER_AGENT, YGGDRASIL_API} = require('../constants')
const handle = require('./handle-response')

/**
 * Checks if an access token is suitable for use with a Minecraft server.
 *
 * @param {String} accessToken - a session access token
 * @param {String} [clientToken] - ust match the one used to obtain the access token
 * @returns {Promise} resolves if tokens are valid
 * @see {@link http://wiki.vg/Authentication#Validate}
 */
function validate (accessToken, clientToken) {
  return handle(got(`${YGGDRASIL_API}/validate`, {
    headers: { 'user-agent': USER_AGENT },
    json: true,
    body: {
      accessToken,
      clientToken
    }
  }))
}

module.exports = validate
