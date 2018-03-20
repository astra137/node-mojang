const querystring = require('querystring')
const {mojang} = require('../agents')
const onApiError = require('../on-api-error')

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
  return mojang.post(`/user/profile/${profileId}/skin`, querystring.stringify({
    model: isSlim ? 'slim' : '',
    url: skinUrl
  }), {
    headers: { 'authorization': `Bearer ${accessToken}` }
  })
    .catch(onApiError)
    .then(({data}) => data)
}

module.exports = setSkin
