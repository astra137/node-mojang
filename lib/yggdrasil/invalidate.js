const fetch = require('node-fetch')
const handleErrors = require('../handle-errors')
const {USER_AGENT, YGGDRASIL_API} = require('../constants')

/**
  * Invalidate an access token.
  *
  * @param {Object} session - a session to end/invalidate
  * @param {string} session.accessToken - a session access token
  * @param {string=} session.clientToken - must match the one used to obtain the access token
  * @returns {Promise} always resolves, regardless if tokens were valid
  * @see {@link http://wiki.vg/Authentication#Invalidate}
  * @example
  * const session = await mojang.authenticate(credentials)
  * console.log('logged in', session.selectedProfile.name)
  * await mojang.invalidate(session)
  * console.log('logged out')
  */
function invalidate ({accessToken, clientToken}) {
  return fetch(`${YGGDRASIL_API}/invalidate`, {
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
    .then(res => null)
}

module.exports = invalidate
