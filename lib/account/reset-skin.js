const fetch = require('node-fetch')
const handleErrors = require('../handle-errors')
const {USER_AGENT, CORE_API} = require('../constants')

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
  return fetch(`${CORE_API}/user/profile/${profileId}/skin`, {
    method: 'DELETE',
    headers: {
      'user-agent': USER_AGENT,
      'authorization': `Bearer ${accessToken}`
    }
  })
    .then(handleErrors)
    .then(res => null)
}

module.exports = resetSkin
