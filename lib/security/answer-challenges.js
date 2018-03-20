const got = require('got')
const onApiError = require('../on-api-error')
const {USER_AGENT, MOJANG_API} = require('../constants')

/**
 * **Undocumented:** Submits a logged-in user's security challenge answers to trust the current IP.
 *
 * @param {Object} session - object from authentication
 * @param {String} session.accessToken - valid access token for the user's account
 * @param {Array} answers - list of answers like `[{id, answer}]`
 * @returns {Promise} resolves if location was secured
 * @see official launcher & minecraft.net XHR
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
  return got(`${MOJANG_API}/user/security/location`, {
    headers: {
      'user-agent': USER_AGENT,
      'authorization': `Bearer ${accessToken}`
    },
    json: true,
    body: answers // TODO some kind of format verification?
  })
    .catch(onApiError)
    .then(res => res.body)
}

module.exports = answerChallenges
