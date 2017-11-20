const got = require('got')
const onApiError = require('../on-api-error')
const {USER_AGENT, YGGDRASIL_API} = require('../constants')

/**
  * Refreshes a given access token. May work on invalid access tokens (about 1 token back in time).
  *
  * @param {String} accessToken - a session access token
  * @param {String} clientToken - must match the one used to obtain the access token
  * @param {Object} [selectedProfile] - use only with access tokens that were **not** assigned a game profile
  * @param {String} selectedProfile.id - profile UUID
  * @param {String} selectedProfile.name - profile name (IGN)
  * @returns {Promise<MojangSession>} resolves if the Mojang gods are feeling generous
  * @see {@link http://wiki.vg/Authentication#Refresh}
  * @example
  * if (!await mojang.isValid(accessToken, clientToken)) {
  *   const nextSession = await mojang.refresh(accessToken, clientToken)
  * }
  */
function refresh (accessToken, clientToken, selectedProfile) {
  return got(`${YGGDRASIL_API}/refresh`, {
    headers: { 'user-agent': USER_AGENT },
    json: true,
    body: {
      accessToken,
      clientToken,
      selectedProfile,
      requestUser: true
    }
  })
    .catch(onApiError)
    .then(res => res.body)
}

module.exports = refresh
