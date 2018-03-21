const fetch = require('node-fetch')
const handleErrors = require('../handle-errors')
const {USER_AGENT, CORE_API} = require('../constants')

/**
 * **Undocumented:** Gets a logged-in user's capes for a given profile.
 *
 * **I have no idea what this endpoint returns!** I just saw the official website try to use it.
 *
 * @param {Object} session - object from authentication
 * @param {string} session.accessToken - valid access token for the user's account
 * @param {string} profileId - game profile UUID to look for capes in
 * @returns {Promise<Array>} resolves with an array of something
 */
function getUserCapeData ({accessToken}, profileId) {
  return fetch(`${CORE_API}/user/profile/${profileId}/cape`, {
    headers: {
      'user-agent': USER_AGENT,
      'authorization': `Bearer ${accessToken}`,
      'accept': 'application/json'
    }
  })
    .then(handleErrors)
    .then(res => res.json())
}

module.exports = getUserCapeData
