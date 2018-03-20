const {yggdrasil} = require('../agents')
const onApiError = require('../on-api-error')

/**
  * Refreshes a given access token. May work on invalid access tokens (about 1 token back in time).
  *
  * @param {Object} session - a session access token
  * @param {string} session.accessToken - a session access token
  * @param {string=} session.clientToken - must match the one used to obtain the access token
  * @param {Object=} session.selectedProfile - use only with access tokens that were **not** assigned a game profile
  * @param {string} session.selectedProfile.id - profile UUID
  * @param {string} session.selectedProfile.name - profile name (IGN)
  * @returns {Promise<MojangSession>} resolves if the Mojang gods are feeling generous
  * @see {@link http://wiki.vg/Authentication#Refresh}
  * @example
  * if (!await mojang.isValid(session)) {
  *   const nextSession = await mojang.refresh(session)
  * }
  */
function refresh ({accessToken, clientToken, selectedProfile}) {
  return yggdrasil.post(`/refresh`, {
    accessToken,
    clientToken,
    selectedProfile,
    requestUser: true
  })
    .catch(onApiError)
    .then(({data}) => data)
}

module.exports = refresh
