const fetch = require('node-fetch')
const handleErrors = require('../handle-errors')
const {USER_AGENT, YGGDRASIL_API} = require('../constants')

/**
  * Checks if an access token is suitable for use with a Minecraft server.
  *
  * @param {Object} session - a session access token
  * @param {string} session.accessToken - a session access token
  * @param {string=} session.clientToken - must match the one used to obtain the access token
  * @returns {Promise<boolean>} resolves true/false if token is valid/invalid
  * @see {@link http://wiki.vg/Authentication#Validate}
  * @example
  * if (await mojang.isValid(session)) {
  *   console.debug('access token still good')
  * } else {
  *   console.debug('access token has gone bad')
  * }
  */
function isValid ({accessToken, clientToken}) {
  return fetch(`${YGGDRASIL_API}/validate`, {
    method: 'POST',
    body: JSON.stringify({
      accessToken,
      clientToken
    }),
    headers: {
      'user-agent': USER_AGENT,
      'content-type': 'application/json'
    }
  })
    .then(handleErrors)
    .then(res => true)
    .catch(err => {
      if (err.message === 'Invalid token') return false
      throw err
    })
}

module.exports = isValid
