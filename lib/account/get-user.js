const fetch = require('node-fetch')
const handleErrors = require('../handle-errors')
const {USER_AGENT, CORE_API} = require('../constants')

/**
 * Gets a logged-in user's private Mojang account information.
 *
 * @param {Object} session - object from authentication
 * @param {string} session.accessToken - valid access token for the user's account
 * @returns {Promise<MojangUser>} resolves if access token is valid
 * @see {@link http://wiki.vg/Mojang_API#User_Info}
 */
function getUser ({accessToken}) {
  return fetch(`${CORE_API}/user`, {
    headers: {
      'user-agent': USER_AGENT,
      'authorization': `Bearer ${accessToken}`,
      'accept': 'application/json'
    }
  })
    .then(handleErrors)
    .then(res => res.json())
}

module.exports = getUser
