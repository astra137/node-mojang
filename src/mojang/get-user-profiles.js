const got = require('got')
const {USER_AGENT, MOJANG_API} = require('../constants')

/**
 * Gets a list of a logged-in user's game profiles.
 *
 * *This endpoint seems undocumented.*
 *
 * @param {String} accessToken - a valid access token for the user's account
 * @returns {Promise.<Array.<MojangProfile>>} resolves if access token is valid
 */
function getUserProfiles (accessToken) {
  return got(`${MOJANG_API}/user/profiles`, {
    json: true,
    headers: {
      'user-agent': USER_AGENT,
      'authorization': `Bearer ${accessToken}`
    }
  })
    .then(res => res.body)
    .catch(err => {
      if (err.response) {
        err.name = err.response.body.error
        err.message = err.response.body.errorMessage
      }
      throw err
    })
}

module.exports = getUserProfiles
