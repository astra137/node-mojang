const got = require('got')
const onApiError = require('../on-api-error')
const {USER_AGENT, MOJANG_API} = require('../constants')

/**
 * Gets a logged-in user's private Mojang account information.
 *
 * @param {String} accessToken - valid access token for the user's account
 * @returns {Promise<MojangUser>} resolves if access token is valid
 * @see {@link http://wiki.vg/Mojang_API#User_Info}
 */
function getUser (accessToken) {
  return got(`${MOJANG_API}/user`, {
    headers: {
      'user-agent': USER_AGENT,
      'authorization': `Bearer ${accessToken}`
    },
    json: true
  })
    .catch(onApiError)
    .then(res => res.body)
}

module.exports = getUser
