const {mojang} = require('../agents')
const onApiError = require('../on-api-error')

/**
 * **Undocumented:** Gets a list of a logged-in user's game profiles.
 *
 * @param {Object} session - object from authentication
 * @param {string} session.accessToken - valid access token for the user's account
 * @returns {Promise<Array<MojangProfile>>} resolves if access token is valid
 */
function getUserProfiles ({accessToken}) {
  return mojang.get(`/user/profiles`, {
    headers: { 'authorization': `Bearer ${accessToken}` }
  })
    .catch(onApiError)
    .then(({data}) => data)
}

module.exports = getUserProfiles
