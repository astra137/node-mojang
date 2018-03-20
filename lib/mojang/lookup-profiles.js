const got = require('got')
const onApiError = require('../on-api-error')
const {USER_AGENT, MOJANG_API} = require('../constants')

/**
  * Gets a list of abbreviated game profiles from the list of profile names.
  *
  * *It seems results are reordered alphabetically.*
  *
  * **You cannot request more than 100 names per request.**
  *
  * @param {Array<String>} names - list of current profile names (IGN)
  * @param {String} [agent] - game agent to search within (minecraft, scrolls)
  * @returns {Promise.<Array>} resolves with `[{id, name, legacy?, demo?}]`
  * @see {@link http://wiki.vg/Mojang_API#Playernames_-.3E_UUIDs}
  * @example
  * async function getPaidMinecraftProfiles (names) {
  *   const list = await getProfiles(names)
  *   return list.filter(({demo}) => !demo)
  * }
  */
function lookupProfiles (names, agent = 'minecraft') {
  return got(`${MOJANG_API}/profiles/${agent}`, {
    headers: {'user-agent': USER_AGENT},
    json: true,
    body: names,
    method: 'POST' // just in case names is empty
  })
    .catch(onApiError)
    .then(res => res.body)
}

module.exports = lookupProfiles
