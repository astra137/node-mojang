const got = require('got')
const onApiError = require('../on-api-error')
const {USER_AGENT, MOJANG_API} = require('../constants')

/**
 * **Undocumented:** Gets the current IGN for the profile UUID.
 *
 * @param {String} profileId - profile UUID (does not work with user UUID)
 * @returns {Promise<{id: String, name: String}>} resolves if profile exists
 */
function getProfile (profileId) {
  return got(`${MOJANG_API}/user/profile/${profileId}`, {
    headers: {'user-agent': USER_AGENT},
    json: true
  })
    .catch(onApiError)
    .then(res => {
      if (res.statusCode === 204) {
        throw new Error(`no such profile: ${profileId}`)
      } else {
        return res.body
      }
    })
}

module.exports = getProfile
