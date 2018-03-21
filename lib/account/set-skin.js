const {URLSearchParams} = require('url')
const fetch = require('node-fetch')
const handleErrors = require('../handle-errors')
const {USER_AGENT, CORE_API} = require('../constants')

/**
 * Sets a logged-in user's in-game skin to an online image.
 *
 * @param {Object} session - object from authentication
 * @param {string} session.accessToken - valid access token for the user's account
 * @param {string} profileId - which profile UUID to update the skin of
 * @param {string} skinUrl - Internet-accessible URL of the image file
 * @param {boolean} [isSlim] - if true, the slim model will be used with the skin
 * @returns {Promise} resolves if access token, profile UUID, and skin URL are valid
 * @see {@link http://wiki.vg/Mojang_API#Change_Skin}
 */
function setSkin ({accessToken}, profileId, skinUrl, isSlim = false) {
  const params = new URLSearchParams()
  params.append('model', isSlim ? 'slim' : '')
  params.append('url', skinUrl)

  return fetch(`${CORE_API}/user/profile/${profileId}/skin`, {
    method: 'POST',
    body: params,
    headers: {
      'user-agent': USER_AGENT,
      'authorization': `Bearer ${accessToken}`
    }
  })
    .then(handleErrors)
    .then(res => null)
}

module.exports = setSkin
