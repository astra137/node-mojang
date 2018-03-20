const {mojang} = require('../agents')
const onApiError = require('../on-api-error')

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
  return mojang.get(`/users/profiles/${agent}/${name}`, { params: {at: date} })
    .catch(onApiError)
    .then(({data, status}) => {
      if (status === 204) {
        throw new Error(`so such name at time: ${name}`)
      } else {
        return data
      }
    })
}

module.exports = lookupProfileAt
