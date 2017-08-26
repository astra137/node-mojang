const got = require('got')
const {USER_AGENT, YGGDRASIL_API} = require('../constants')
const handle = require('./handle-response')

/**
 * Refreshes a given access token.
 *
 * @param {String} accessToken - required. Valid access token
 * @param {String} clientToken - required. Must match the one used to obtain the access token
 * @param {Object} selectedProfile - optional. Only use with access tokens that were *not* assigned a game profile
 * @param {String} selectedProfile.id - Player id
 * @param {String} selectedProfile.name - Player name
 * @returns {Promise.<Object>} - Promise which resolves to a session {clientToken, accessToken, selectedProfile, user}
 * @see {@link http://wiki.vg/Authentication#Refresh}
 */
function refresh (accessToken, clientToken, selectedProfile) {
  return handle(got(`${YGGDRASIL_API}/refresh`, {
    headers: { 'user-agent': USER_AGENT },
    json: true,
    body: {
      accessToken,
      clientToken,
      selectedProfile,
      requestUser: true
    }
  }))
}

module.exports = refresh
