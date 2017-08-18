const yggdrasil = require('./endpoints/yggdrasil')

/**
 * Invalidate an obtained access token
 *
 * @param {String} accessToken - required. access token to be invalidated
 * @param {String} clientToken - optional. client token (needs to be identical to the one you used to obtain the access token)
 * @returns {Promise.<String>} - resolves if tokens are both valid and invalid
 * @see {@link http://wiki.vg/Authentication#Invalidate} for a detailed documentation of the endpoint
 */
function invalidate (accessToken, clientToken) {
  return yggdrasil('/invalidate', {
    body: {
      accessToken,
      clientToken
    }
  })
}

module.exports = invalidate
