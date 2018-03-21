const fetch = require('node-fetch')
const handleErrors = require('../handle-errors')
const {USER_AGENT, CORE_API} = require('../constants')

/**
 * **Undocumented:** Gets a list of all of a logged-in user's game profiles.
 *
 * I just guessed this endpoint was here, I haven't seen it used by anything in the wild.
 *
 * @param {Object} session - object from authentication
 * @param {string} session.accessToken - valid access token for the user's account
 * @returns {Promise<Array<MojangProfile>>} resolves if access token is valid
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
