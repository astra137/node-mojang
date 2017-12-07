const got = require('got')
const onApiError = require('../on-api-error')
const {USER_AGENT, MOJANG_API} = require('../constants')

/**
 * Resets/deletes a logged-in user's in-game skin.
 *
 * @param {Object} session - object from authentication
 * @param {String} session.accessToken - valid access token for the user's account
 * @param {String} profileId - which profile UUID to update the skin of
 * @returns {Promise} resolves if skin was deleted/reset
 * @see {@link http://wiki.vg/Mojang_API#Reset_Skin}
 */
function resetSkin ({accessToken}, profileId) {
  return got(`${MOJANG_API}/user/profile/${profileId}/skin`, {
    method: 'DELETE',
    json: true,
    headers: {
      'user-agent': USER_AGENT,
      'authorization': `Bearer ${accessToken}`
    }
  })
    .catch(onApiError)
    .then(res => res.body)
}

module.exports = resetSkin
