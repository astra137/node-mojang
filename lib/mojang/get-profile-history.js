const fetch = require('node-fetch')
const handleErrors = require('../handle-errors')
const {USER_AGENT, CORE_API} = require('../constants')

/**
 * Gets all name changes for a given player's profile UUID.
 *
 * @param {string} profileId - profile UUID (does not work with user UUID)
 * @returns {Promise<{name: string, changedToAt: number}[]>} resolves if profile exists
 * @see {@link http://wiki.vg/Mojang_API#UUID_-.3E_Name_history}
 */
function getProfileHistory (profileId) {
  // BASE/user/profile/:id/names also seems to provide the same endpoint
  return fetch(`${CORE_API}/user/profiles/${profileId}/names`, {
    headers: {
      'user-agent': USER_AGENT,
      'accept': 'application/json'
    }
  })
    .then(handleErrors)
    .then(res => {
      if (res.status === 204) throw new Error(`no such profile: ${profileId}`)
      return res.json()
    })
}

module.exports = getProfileHistory
