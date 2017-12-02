const got = require('got')
const onApiError = require('../on-api-error')
const {USER_AGENT, MOJANG_API} = require('../constants')

/**
 * **Undocumented:** Gets a logged-in user's capes for a given profile.
 *
 * **I have no idea what this endpoint returns!**
 *
 * @param {Object} session - object from authentication
 * @param {String} session.accessToken - valid access token for the user's account
 * @param {String} profileId - game profile UUID to look for capes in
 * @returns {Promise<Array>} resolves with an array of something
 * @see minecraft.net XHR requests
 */
function getUserCapeData ({accessToken}, profileId) {
  return got(`${MOJANG_API}/user/profile/${profileId}/cape`, {
    headers: {
      'user-agent': USER_AGENT,
      'authorization': `Bearer ${accessToken}`
    },
    json: true
  })
    .catch(onApiError)
    .then(res => res.body)
}

module.exports = getUserCapeData
