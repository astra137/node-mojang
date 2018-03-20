const {mojang} = require('../agents')
const onApiError = require('../on-api-error')

/**
 * **Undocumented:** Gets profile data for the given profile UUID.
 *
 * @param {string} profileId - profile UUID (does not work with user UUID)
 * @returns {Promise<Object>} resolves with `{id, name, legacy?, demo?}`
 */
function getProfile (profileId) {
  return mojang.get(`/user/profile/${profileId}`)
    .catch(onApiError)
    .then(({data, status}) => {
      if (status === 204) {
        throw new Error(`no such profile: ${profileId}`)
      } else {
        return data
      }
    })
}

module.exports = getProfile
