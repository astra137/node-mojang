const fetch = require('node-fetch')
const handleErrors = require('../handle-errors')
const {USER_AGENT, CORE_API} = require('../constants')

/**
 * **Undocumented:** Gets profile data for the given profile UUID.
 *
 * @param {string} profileId - profile UUID (does not work with user UUID)
 * @returns {Promise<Object>} resolves with `{id, name, legacy?, demo?}`
 */
function getProfile (profileId) {
  return fetch(`${CORE_API}/user/profile/${profileId}`, {
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

module.exports = getProfile
