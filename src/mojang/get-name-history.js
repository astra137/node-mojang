const got = require('got')
const onApiError = require('../on-api-error')
const {USER_AGENT, MOJANG_API} = require('../constants')

/**
 * Gets all name changes for a given player's profile UUID.
 *
 * @param {String} profileId - profile UUID (does not work with user UUID)
 * @returns {Promise<{name: String, changedToAt: Number}[]>} resolves if profile exists
 * @see {@link http://wiki.vg/Mojang_API#UUID_-.3E_Name_history}
 */
function getNameHistory (profileId) {
  return got(`${MOJANG_API}/user/profiles/${profileId}/names`, {
    headers: {'user-agent': USER_AGENT},
    json: true
  })
    .catch(onApiError)
    .then(res => {
      if (res.statusCode === 204) {
        throw new Error(`no such profile: ${profileId}`)
      } else {
        return res.body
      }
    })
}

module.exports = getNameHistory
