const {mojang} = require('../agents')
const onApiError = require('../on-api-error')

/**
 * **Undocumented:** Gets a logged-in user's capes for a given profile.
 *
 * **I have no idea what this endpoint returns!**
 *
 * @param {Object} session - object from authentication
 * @param {string} session.accessToken - valid access token for the user's account
 * @param {string} profileId - game profile UUID to look for capes for
 * @returns {Promise<Array>} array of something?
 * @see {@link minecraft.net}
 */
function getUserCapeData ({accessToken}, profileId) {
  return mojang.get(`/user/profile/${profileId}/cape`, {
    headers: { 'authorization': `Bearer ${accessToken}` }
  })
    .catch(onApiError)
    .then(({data}) => data)
}

module.exports = getUserCapeData
