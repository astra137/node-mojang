const got = require('got')
const onApiError = require('../on-api-error')
const {USER_AGENT, MOJANG_API} = require('../constants')

/**
 * Gets an abbreviated game profile from a given timestamp.
 *
 * @param {String} name - current profile name (IGN) of the user
 * @param {Number} [date] - UNIX timestamp to check the username at
 * @param {String} [agent] - game agent to check against
 * @returns {Promise.<Object>} resolves with `{id, name, legacy, demo}`
 * @see {@link http://wiki.vg/Mojang_API#Username_-.3E_UUID_at_time}
 * @deprecated prefer searching by UUID instead of name
 * @example
 * const {id, name, legacy, demo} = await getProfileAt('Notch')
 */
function getProfileAt (name, date, agent = 'minecraft') {
  const hasDate = typeof date !== 'undefined'
  const query = hasDate
    ? `/users/profiles/${agent}/${name}?at=${date}`
    : `/users/profiles/${agent}/${name}`

  return got(`${MOJANG_API}${query}`, {
    headers: {'user-agent': USER_AGENT},
    json: true
  })
    .catch(onApiError)
    .then(res => {
      if (res.statusCode === 204) {
        throw new Error(`so such name at time: ${name}`)
      } else {
        return res.body
      }
    })
}

module.exports = getProfileAt
