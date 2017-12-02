const got = require('got')
const onApiError = require('../on-api-error')
const {USER_AGENT, MOJANG_API} = require('../constants')

/**
  * **Undocumented:** Gets a logged-in user's security challenge questions.
  *
  * @param {Object} session - object from authentication
  * @param {String} session.accessToken - valid access token for the user's account
  * @returns {Promise.<Array.<MojangChallenge>>} resolves if access token is valid
  * @see official launcher & minecraft.net XHR
  */
function getChallenges ({accessToken}) {
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
