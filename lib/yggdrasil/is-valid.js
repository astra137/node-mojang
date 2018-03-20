const {yggdrasil} = require('../agents')
const onApiError = require('../on-api-error')

/**
  * Checks if an access token is suitable for use with a Minecraft server.
  *
  * @param {Object} session - a session access token
  * @param {string} session.accessToken - a session access token
  * @param {string=} session.clientToken - must match the one used to obtain the access token
  * @returns {Promise<boolean>} resolves true if tokens are valid
  * @see {@link http://wiki.vg/Authentication#Validate}
  * @example
  * if (await mojang.isValid(session)) {
  *   console.debug('access token still good')
  * } else {
  *   console.debug('access token has gone bad')
  * }
  */
function isValid ({accessToken, clientToken}) {
  return yggdrasil.post(`/validate`, {
    accessToken,
    clientToken
  })
    .catch(onApiError)
    .then(() => {
      // no error means the endpoint accepted the token
      return true
    }).catch(err => {
      // if the endpoint reported a bad token, just resolve false
      if (err.message === 'Invalid token') return false
      throw err
    })
}

module.exports = isValid
