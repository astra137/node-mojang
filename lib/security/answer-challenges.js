const fetch = require('node-fetch')
const handleErrors = require('../handle-errors')
const {USER_AGENT, CORE_API} = require('../constants')

/**
  * **Undocumented:** Submits a logged-in user's security challenge answers to trust the current IP.
  *
  * Seen in the official launcher & minecraft.net XHR.
  *
  * @param {Object} session - object from authentication
  * @param {string} session.accessToken - valid access token for the user's account
  * @param {Array} answers - list of answers like `[{id, answer}]`
  * @returns {Promise} resolves if location was secured
  * @example
  * const challenges = await getChallenges(session)
  * const answers = await Promise.all(challenges.map(async c => {
  *   const answer = await prompt(c.question.question)
  *   return {id: c.answer.id, answer}
  * }))
  * await answerChallenges(session, answers) // might throw
  * await isSecure(session) // true if successful
  */
function answerChallenges ({accessToken}, answers) {
  return fetch(`${CORE_API}/user/security/location`, {
    method: 'POST',
    body: JSON.stringify(answers), // TODO some kind of format verification?
    headers: {
      'user-agent': USER_AGENT,
      'authorization': `Bearer ${accessToken}`,
      'content-type': 'application/json'
    }
  })
    .then(handleErrors)
    .then(res => null)
}

module.exports = answerChallenges
