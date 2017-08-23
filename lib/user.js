const mojangapi = require('./endpoints/mojangapi')

/**
 * Returns information on the logged in Mojang account.
 *
 * @param {String} accessToken - required. The access token to authorize the request
 * @returns {Promise.<Object>} - Promise which resolves to detailed information on the user. See the wiki for specifics.
 * @see {@link http://wiki.vg/Mojang_API#User_Info} for more detailed information
 */
module.exports = function (accessToken) {
  return mojangapi(`/user`, accessToken, null)
    .then(res => res.body)
    .catch(err => {
      if (err.response) {
        err.name = err.response.body.error
        err.message = err.response.body.errorMessage
      }
      throw err
    })
}
