const {mojang} = require('../agents')
const onApiError = require('../on-api-error')

/**
 * Gets a logged-in user's private Mojang account information.
 *
 * @param {Object} session - object from authentication
 * @param {string} session.accessToken - valid access token for the user's account
 * @returns {Promise<MojangUser>} resolves if access token is valid
 * @see {@link http://wiki.vg/Mojang_API#User_Info}
 */
function getUser ({accessToken}) {
  return mojang.get(`/user`, {
    headers: { 'authorization': `Bearer ${accessToken}` }
  })
    .catch(onApiError)
    .then(({data}) => data)
}

module.exports = getUser
