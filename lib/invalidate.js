const yggdrasil = require('./endpoints/yggdrasil')

/**
 * Invalidate an obtained access token
 *
 * @param {String} accessToken - required. access token to be invalidated
 * @param {String} clientToken - required. client token (needs to be identical to the one you used to obtain the access token)
 * @returns {Promise.<String>} - empty response if successful
 * @see {@link http://wiki.vg/Authentication#Endpoint_5} for a detailed documentation of the endpoint
 */
function invalidate (accessToken, clientToken) {
  return yggdrasil('/invalidate', {
    body: {
      accessToken,
      clientToken
    }
  }).then(res => res.body)
}

module.exports = invalidate
