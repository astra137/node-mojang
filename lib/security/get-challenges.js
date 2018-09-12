const fetch = require('node-fetch')
const handleErrors = require('../handle-errors')
const {USER_AGENT, CORE_API} = require('../constants')

/**
  * **Undocumented:** Gets a logged-in user's security challenge questions.
  *
  * Seen in the official launcher & minecraft.net XHR.
  *
  * @param {Object} session - object from authentication
  * @param {string} session.accessToken - valid access token for the user's account
  * @returns {Promise<Array<MojangChallenge>>} resolves if access token is valid
  */
function getChallenges ({accessToken}) {
  return fetch(`${CORE_API}/user/security/challenges`, {
    headers: {
      'user-agent': USER_AGENT,
      'authorization': `Bearer ${accessToken}`,
      'accept': 'application/json'
    }
  })
    .then(handleErrors)
    .then(res => res.json())
}

module.exports = getChallenges
