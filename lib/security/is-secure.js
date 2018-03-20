const {mojang} = require('../agents')
const onApiError = require('../on-api-error')

/**
  * **Undocumented:** Gets a logged-in user's IP security status for the current IP.
  *
  * Seen in official launcher and minecraft.net XHR.
  *
  * @param {Object} session - object from authentication
  * @param {string} session.accessToken - valid access token for the user's account
  * @returns {Promise<boolean>} resolves true if current IP is secure
  * @example
  * const canChangeSkins = await isSecure(accessToken)
  */
function isSecure ({accessToken}) {
  return mojang.get(`/user/security/location`, {
    headers: { 'authorization': `Bearer ${accessToken}` }
  })
    .catch(onApiError)
    .then(res => {
      // should be 204 no content which means trusted IP
      return true
    })
    .catch(err => {
      // convenience wrapper around untrusted IP error
      // so user only needs to try/catch for network/auth errors
      if (err.message === 'Current IP is not secured') return false
      // pass any other error forward
      throw err
    })
}

module.exports = isSecure
