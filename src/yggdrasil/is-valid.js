const got = require('got')
const onApiError = require('../on-api-error')
const {USER_AGENT, YGGDRASIL_API} = require('../constants')

/**
  * Checks if an access token is suitable for use with a Minecraft server.
  *
  * @param {String} accessToken - a session access token
  * @param {String} [clientToken] - must match the one used to obtain the access token
  * @returns {Promise<Boolean>} resolves true if tokens are valid
  * @see {@link http://wiki.vg/Authentication#Validate}
  * @example
  * if (await mojang.isValid(accessToken, clientToken)) {
  *   console.debug('access token still good')
  * } else {
  *   console.debug('access token has gone bad')
  * }
  */
function isValid (accessToken, clientToken) {
  return got(`${YGGDRASIL_API}/validate`, {
    headers: { 'user-agent': USER_AGENT },
    json: true,
    body: {
      accessToken,
      clientToken
    }
  })
    .catch(onApiError)
    .then(() => true)
    .catch(err => {
      if (err.message === 'Invalid token') return false
      throw err
    })
}

module.exports = isValid
