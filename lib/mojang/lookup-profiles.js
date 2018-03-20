const {mojang} = require('../agents')
const onApiError = require('../on-api-error')

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
  return mojang.post(`/profiles/${agent}`, names)
    .catch(onApiError)
    .then(({data}) => data)
}

module.exports = lookupProfiles
