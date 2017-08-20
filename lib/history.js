const mojangapi = require('./endpoints/mojangapi')

/**
 * Gets all name changes for a given player's profile ID
 *
 * @param {String} profileId - required. Profile ID (does not work with user ID).
 * @returns {Promsie.<Array>} - Promise which resolves with [{name, changedToAt}]
 * @see {@link http://wiki.vg/Mojang_API#UUID_-.3E_Name_history} for a detailed documentation of the endpoint
 */
function history (profileId) {
  return mojangapi(`/user/profiles/${profileId}/names`)
    .then(res => {
      if (res.statusCode === 204) {
        throw new Error('Profile does not exist')
      } else {
        return res.body
      }
    })
}

module.exports = history
