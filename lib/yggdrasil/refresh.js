const fetch = require('node-fetch')
const handleErrors = require('../handle-errors')
const {USER_AGENT, YGGDRASIL_API} = require('../constants')

/**
  * Refreshes a given access token. May work on invalid access tokens (about 1 token back in time).
  *
  * @param {Object} session - a session access token
  * @param {string} session.accessToken - a session access token
  * @param {string=} session.clientToken - must match the one used to obtain the access token
  * @param {Object=} session.selectedProfile - use only with access tokens that were **not** assigned a game profile
  * @param {string} session.selectedProfile.id - profile UUID
  * @param {string} session.selectedProfile.name - profile name (IGN)
  * @returns {Promise<MojangSession>} resolves if Yggdrasil is feeling generous
  * @see {@link http://wiki.vg/Authentication#Refresh}
  * @example
  * const session = await mojang.authenticate({username, password})
  * // ...
  * if (!await mojang.isValid(session)) {
  *   const nextSession = await mojang.refresh(session)
  *   // ...
  * }
  */
function refresh ({accessToken, clientToken, selectedProfile}) {
  return fetch(`${YGGDRASIL_API}/refresh`, {
    method: 'POST',
    body: JSON.stringify({
      accessToken,
      clientToken,
      selectedProfile,
      requestUser: true
    }),
    headers: {
      'user-agent': USER_AGENT,
      'content-type': 'application/json',
      'accept': 'application/json'
    }
  })
    .then(handleErrors)
    .then(res => res.json())
}

module.exports = refresh
