const {mojang} = require('../agents')
const onApiError = require('../on-api-error')

/**
  * **Undocumented:** Gets a logged-in user's security challenge questions.
  *
  * Seen in official launcher and minecraft.net XHR.
  *
  * @param {Object} session - object from authentication
  * @param {string} session.accessToken - valid access token for the user's account
  * @returns {Promise<Array<MojangChallenge>>} resolves if access token is valid
  */
function getChallenges ({accessToken}) {
  return mojang.get(`/user/security/challenges`, {
    headers: { 'authorization': `Bearer ${accessToken}` }
  })
    .catch(onApiError)
    .then(({data}) => data)
}

module.exports = getChallenges
