const got = require('got')
const onApiError = require('../on-api-error')
const {USER_AGENT, MOJANG_API} = require('../constants')

/**
 * **Undocumented:** Gets a list of all of a logged-in user's game profiles.
 *
 * @param {Object} session - object from authentication
 * @param {String} session.accessToken - valid access token for the user's account
 * @returns {Promise<Array<MojangProfile>>} resolves if access token is valid
 * @see maccelerated just guessed this endpoint would exist
 */
function getUserProfiles ({accessToken}) {
  return got(`${MOJANG_API}/user/profiles`, {
    headers: {
      'user-agent': USER_AGENT,
      'authorization': `Bearer ${accessToken}`
    },
    json: true
  })
    .catch(onApiError)
    .then(res => res.body)
}

module.exports = getUserProfiles
