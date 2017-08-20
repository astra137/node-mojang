const yggdrasil = require('./endpoints/yggdrasil')

/**
 * Refreshes a given access token
 *
 * @param {String} accessToken - required. valid access token
 * @param {String} clientToken - required. client token (needs to be identical to the one used to obtain the access token)
 * @param {Object} selectedProfile - optional. Used only for access tokens without a selected profile
 * @param {String} selectedProfile.id - Player id
 * @param {String} selectedProfile.name - Player name
 * @param {Boolean} requestUser - optional. true adds the user object to the response
 * @returns {Promise.<Object>} - Promise which resolves to a user object containing a new access token, player and account information
 * @see {@link http://wiki.vg/Authentication#Refresh} for a detailed documentation of the endpoint
 */
function refresh (accessToken, clientToken, selectedProfile, requestUser) {
  return yggdrasil('/refresh', {
    accessToken,
    clientToken,
    selectedProfile,
    requestUser
  })
}

module.exports = refresh
