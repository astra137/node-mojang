const got = require('got')
const {USER_AGENT, YGGDRASIL_API} = require('../constants')
const handle = require('./handle-response')

/**
 * Invalidate an access token.
 *
 * @param {String} accessToken - a session access token
 * @param {String} [clientToken] - must match the one used to obtain the access token
 * @returns {Promise} always resolves, regardless if tokens were valid
 * @see {@link http://wiki.vg/Authentication#Invalidate}
 */
function invalidate (accessToken, clientToken) {
  return handle(got(`${YGGDRASIL_API}/invalidate`, {
    headers: { 'user-agent': USER_AGENT },
    json: true,
    body: {
      accessToken,
      clientToken
    }
  }))
}

module.exports = invalidate
