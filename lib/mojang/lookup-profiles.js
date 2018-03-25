const fetch = require('node-fetch')
const handleErrors = require('../handle-errors')
const {USER_AGENT, CORE_API} = require('../constants')

/**
  * Gets a list of abbreviated game profiles from the list of profile names.
  *
  * *It seems results are reordered alphabetically.*
  *
  * **You cannot request more than 100 names per request.**
  *
  * @param {Array<string>} names - list of current profile names (IGN)
  * @param {string} [agent] - game agent to search within (minecraft, scrolls)
  * @returns {Promise<Array>} resolves with `[{id, name, legacy?, demo?}]`
  * @see {@link http://wiki.vg/Mojang_API#Playernames_-.3E_UUIDs}
  * @example
  * async function getPaidMinecraftProfiles (names) {
  *   const list = await getProfiles(names)
  *   return list.filter(({demo}) => !demo)
  * }
  */
function lookupProfiles (names, agent = 'minecraft') {
  return fetch(`${CORE_API}/profiles/${agent}`, {
    method: 'POST',
    body: JSON.stringify(names),
    headers: {
      'user-agent': USER_AGENT,
      'content-type': 'application/json',
      'accept': 'application/json'
    }
  })
    .then(handleErrors)
    .then(res => res.json())
}

module.exports = lookupProfiles
