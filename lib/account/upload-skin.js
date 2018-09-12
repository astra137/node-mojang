const FormData = require('form-data')
const fetch = require('node-fetch')
const handleErrors = require('../handle-errors')
const {USER_AGENT, CORE_API} = require('../constants')

/**
 * Uploads a file as a logged-in user's in-game skin.
 *
 * @param {Object} session - object from authentication
 * @param {string} session.accessToken - valid access token for the user's account
 * @param {string} profileId - which profile UUID to update the skin of
 * @param {Stream|Buffer} file - new skin's binary image data
 * @param {boolean} [isSlim] - if true, the slim model will be used with the skin
 * @returns {Promise} resolves if access token, profile UUID, and stream are valid
 * @see {@link http://wiki.vg/Mojang_API#Change_Skin}
 */
function uploadSkin ({accessToken}, profileId, file, isSlim = false) {
  const form = new FormData()
  form.append('model', isSlim ? 'slim' : '')
  form.append('file', file)

  return fetch(`${CORE_API}/user/profile/${profileId}/skin`, {
    method: 'PUT',
    body: form,
    headers: {
      'user-agent': USER_AGENT,
      'authorization': `Bearer ${accessToken}`
    }
  })
    .then(handleErrors)
    .then(res => null)
}

module.exports = uploadSkin
