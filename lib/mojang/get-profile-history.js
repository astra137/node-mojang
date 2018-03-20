const {mojang} = require('../agents')
const onApiError = require('../on-api-error')

/**
 * Gets all name changes for a given player's profile UUID.
 *
 * @param {string} profileId - profile UUID (does not work with user UUID)
 * @returns {Promise<{name: string, changedToAt: number}[]>} resolves if profile exists
 * @see {@link http://wiki.vg/Mojang_API#UUID_-.3E_Name_history}
 */
function getProfileHistory (profileId) {
  // NOTE /user/profile/:id/names also seems to provide the same endpoint
  return mojang.get(`/user/profiles/${profileId}/names`)
    .catch(onApiError)
    .then(({data, status}) => {
      if (status === 204) {
        throw new Error(`no such profile: ${profileId}`)
      } else {
        return data
      }
    })
}

module.exports = getProfileHistory
