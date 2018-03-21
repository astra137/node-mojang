const fetch = require('node-fetch')
const handleErrors = require('../handle-errors')
const {USER_AGENT, CORE_API} = require('../constants')

/**
 * Gets an abbreviated game profile at a given timestamp for an IGN name.
 *
 * **Prefer {@link lookupProfiles} when looking up current data.**
 *
 * @param {string} name - current profile name (IGN) of the user
 * @param {number} [date] - UNIX timestamp to check the username at
 * @param {string} [agent] - game agent to check against
 * @returns {Promise<Object>} resolves with `{id, name, legacy?, demo?}`
 * @see {@link http://wiki.vg/Mojang_API#Username_-.3E_UUID_at_time}
 * @example
 * const {id, name, legacy, demo} = await lookupProfileAt('Notch', 1503335853700)
 */
function lookupProfileAt (name, date, agent = 'minecraft') {
  const hasDate = typeof date !== 'undefined'
  const query = hasDate
    ? `/users/profiles/${agent}/${name}?at=${date}`
    : `/users/profiles/${agent}/${name}`

  return fetch(`${CORE_API}${query}`, {
    headers: {
      'user-agent': USER_AGENT,
      'accept': 'application/json'
    }
  })
    .then(handleErrors)
    .then(res => {
      if (res.status === 204) throw new Error(`so such name at time: ${name}`)
      return res.json()
    })
}

module.exports = lookupProfileAt
