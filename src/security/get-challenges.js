const got = require('got')
const onApiError = require('../on-api-error')
const {USER_AGENT, MOJANG_API} = require('../constants')

/**
 * Gets a logged-in user's security challenge questions.
 *
 * @param {String} accessToken - valid access token for the user's account
 * @returns {Promise.<Array>} resolves with `[{answer:{id}, question:{id, question}}]`
 * @see **Undocumented** observed from official launcher & minecraft.net XHR
 */
function getChallenges (accessToken) {
  return got(`${MOJANG_API}/user/security/challenges`, {
    headers: {
      'user-agent': USER_AGENT,
      'authorization': `Bearer ${accessToken}`
    },
    json: true
  })
    .catch(onApiError)
    .then(res => res.body)
}

module.exports = getChallenges
