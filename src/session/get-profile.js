const got = require('got')
const {USER_AGENT, SESSION_API} = require('../constants')

/**
 * A special service that returns a profile's name, skin, cape, and maybe more.
 *
 * **Rate limit: You can request the same profile once per minute.**
 *
 * @param {String} profileId - required. UUID of a player
 * @returns {Promise.<Object>} - Promise which resolves to {id, name, properties}
 * @see {@link http://wiki.vg/Mojang_API#UUID_-.3E_Profile_.2B_Skin.2FCape}
 */
function getProfile (profileId) {
  return got(`${SESSION_API}/session/minecraft/profile/${profileId}`, {
    headers: { 'user-agent': USER_AGENT },
    json: true
  })
    .then(res => {
      if (res.statusCode === 204) {
        throw new Error('Profile does not exist')
      } else {
        // TODO parse textures value
        return res.body
      }
    })
}

module.exports = getProfile
