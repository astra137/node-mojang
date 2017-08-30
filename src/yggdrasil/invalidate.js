const got = require('got')
const onApiError = require('../on-api-error')
const {USER_AGENT, YGGDRASIL_API} = require('../constants')

/**
  * Invalidate an access token.
  *
  * @param {String} accessToken - a session access token
  * @param {String} [clientToken] - must match the one used to obtain the access token
  * @returns {Promise} always resolves, regardless if tokens were valid
  * @see {@link http://wiki.vg/Authentication#Invalidate}
  * @example
  * mojang.invalidate(accessToken, clientToken)
  *   .then(() => console.log('logged out'))
  *   .catch(err => console.error(err))
  */
function invalidate (accessToken, clientToken) {
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
