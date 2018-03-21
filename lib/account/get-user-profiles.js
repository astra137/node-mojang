const fetch = require('node-fetch')
const handleErrors = require('../handle-errors')
const {USER_AGENT, CORE_API} = require('../constants')

/**
 * **Undocumented:** Gets a list of all of a logged-in user's game profiles.
 *
 * @param {Object} session - object from authentication
 * @param {String} session.accessToken - valid access token for the user's account
 * @returns {Promise<Array<MojangProfile>>} resolves if access token is valid
 * @see maccelerated just guessed this endpoint would exist
 */
function getUserProfiles ({accessToken}) {
  return fetch(`${CORE_API}/user/profiles`, {
    headers: {
      'user-agent': USER_AGENT,
      'authorization': `Bearer ${accessToken}`,
      'accept': 'application/json'
    }
  })
    .then(handleErrors)
    .then(res => res.json())
}

module.exports = getUserProfiles
