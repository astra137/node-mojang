const got = require('got')
const {USER_AGENT, MOJANG_API} = require('../constants')

/**
 * Gets all name changes for a given player's profile ID.
 *
 * @param {String} profileId - profile UUID (does not work with user ID)
 * @returns {Promise.<Array>} resolves with `[{name, changedToAt}]`.
 * @see {@link http://wiki.vg/Mojang_API#UUID_-.3E_Name_history}
 */
function getNameHistory (profileId) {
  return got(`${MOJANG_API}/user/profiles/${profileId}/names`, {
    json: true,
    headers: { 'user-agent': USER_AGENT }
  })
    .then(res => {
      if (res.statusCode === 204) {
        throw new Error('profileId does not exist')
      } else {
        return res.body
      }
    })
}

module.exports = getNameHistory
