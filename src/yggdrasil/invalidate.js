const got = require('got')
const onApiError = require('../on-api-error')
const {USER_AGENT, YGGDRASIL_API} = require('../constants')

/**
  * Invalidate an access token.
  *
  * @param {Object} session - a session to end/invalidate
  * @param {String} session.accessToken - a session access token
  * @param {String=} session.clientToken - must match the one used to obtain the access token
  * @returns {Promise} always resolves, regardless if tokens were valid
  * @see {@link http://wiki.vg/Authentication#Invalidate}
  * @example
  * const session = await mojang.authenticate(credentials)
  * console.log('logged in', session.selectedProfile.name)
  * await mojang.invalidate(session)
  * console.log('logged out')
  */
function invalidate ({accessToken, clientToken}) {
  return got(`${YGGDRASIL_API}/invalidate`, {
    headers: { 'user-agent': USER_AGENT },
    json: true,
    body: {
      accessToken,
      clientToken
    }
  })
    .catch(onApiError)
}

module.exports = invalidate
