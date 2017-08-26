const got = require('got')
const {USER_AGENT, YGGDRASIL_API} = require('../constants')
const handle = require('./handle-response')

/**
 * Checks if an access token is suitable for use with a Minecraft server.
 *
 * @param {String} accessToken - required. Access token to be validated
 * @param {String} clientToken - optional. Must match the one used to obtain the access token
 * @returns {Promise} - resolves if access token is valid
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
