const {mojang} = require('../agents')
const onApiError = require('../on-api-error')

/**
 * Resets/deletes a logged-in user's in-game skin.
 *
 * @param {Object} session - object from authentication
 * @param {string} session.accessToken - valid access token for the user's account
 * @param {string} profileId - which profile UUID to update the skin of
 * @returns {Promise} resolves if skin was deleted/reset
 * @see {@link http://wiki.vg/Mojang_API#Reset_Skin}
 */
function resetSkin ({accessToken}, profileId) {
  return mojang.delete(`/user/profile/${profileId}/skin`, {
    headers: { 'authorization': `Bearer ${accessToken}` }
  })
    .catch(onApiError)
    .then(({data}) => data)
}

module.exports = resetSkin
