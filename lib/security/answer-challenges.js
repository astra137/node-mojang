const {mojang} = require('../agents')
const onApiError = require('../on-api-error')

/**
 * **Undocumented:** Submits a logged-in user's security challenge answers to trust the current IP.
 *
 * Seen in official launcher and minecraft.net XHR.
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
  // TODO some kind of format verification?
  return mojang.post(`/user/security/location`, answers, {
    headers: { 'authorization': `Bearer ${accessToken}` }
  })
    .catch(onApiError)
    .then(({data}) => data)
}

module.exports = answerChallenges
