const got = require('got')
const {USER_AGENT, YGGDRASIL_API} = require('../constants')
const handle = require('./handle-response')

/**
 * Refreshes a given access token. May work on invalid access tokens.
 *
 * @param {String} accessToken - a session access token
 * @param {String} clientToken - must match the one used to obtain the access token
 * @param {Object} [selectedProfile] - only use with access tokens that were *not* assigned a game profile
 * @param {String} selectedProfile.id - profile ID
 * @param {String} selectedProfile.name - profile name (IGN)
 * @returns {Promise.<Object>} resolves to a new session {clientToken, accessToken, selectedProfile, user}
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
