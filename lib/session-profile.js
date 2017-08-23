const sessionapi = require('./endpoints/sessionapi')

/**
 * A special service that returns a profile's name, skin, cape, and maybe more.
 *
 * @param {String} profileId - required. UUID of a player
 * @returns {Promise.<Object>} - Promise which resolves to {id, name, properties}
 * @see {@link http://wiki.vg/Mojang_API#UUID_-.3E_Profile_.2B_Skin.2FCape}
 */
module.exports = function (profileId) {
  return sessionapi(`/session/minecraft/profile/${profileId}`)
    .then(res => {
      if (res.statusCode === 204) {
        throw new Error('Profile does not exist')
      } else {
        return res.body
      }
    })
}
