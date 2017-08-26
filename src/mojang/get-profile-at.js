const got = require('got')
const {USER_AGENT, MOJANG_API} = require('../constants')

/**
 * Gets a game profile from a given timestamp.
 *
 * @param {String} name - Current profile name of the user
 * @param {Number} [date] - UNIX timestamp to check the username at
 * @param {String} [agent] - Game agent to check against
 * @example
 * const {id, name, legacy, demo} = await getNameAt('Notch')
 * @returns {Promise.<Object>} that resolves with `{id, name, legacy, demo}`.
 * @see {@link http://wiki.vg/Mojang_API#Username_-.3E_UUID_at_time}
 */
function getProfileAt (name, date, agent = 'minecraft') {
  const hasDate = typeof date !== 'undefined'
  const query = hasDate
    ? `/users/profiles/${agent}/${name}?at=${date}`
    : `/users/profiles/${agent}/${name}`

  return got(`${MOJANG_API}${query}`, {
    json: true,
    headers: { 'user-agent': USER_AGENT }
  })
    .catch(err => {
      if (err.response) {
        err.name = err.response.body.error
        err.message = err.response.body.errorMessage
      }
      throw err
    })
    .then(res => {
      if (res.statusCode === 204) {
        throw new Error(`name ${name} ${hasDate ? 'did' : 'does'} not exist`)
      } else {
        return res.body
      }
    })
}

module.exports = getProfileAt
