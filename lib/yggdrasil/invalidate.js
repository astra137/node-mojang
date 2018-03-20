const {yggdrasil} = require('../agents')
const onApiError = require('../on-api-error')

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
  return yggdrasil.post(`/invalidate`, {
    accessToken,
    clientToken
  })
    .catch(onApiError)
    .then(({data}) => data)
}

module.exports = invalidate
