const got = require('got')
const {Base64} = require('js-base64')
const {USER_AGENT, SESSION_API} = require('../constants')

/**
 * A special service that returns a profile's name, skin URL, and cape URL.
 *
 * **Rate limit: You can request the same profile once per minute.**
 *
 * @param {String} profileId - profile UUID of a player
 * @returns {Promise.<Object>} resolves to `{id, name, timestamp, skin, cape}`
 * @see {@link http://wiki.vg/Mojang_API#UUID_-.3E_Profile_.2B_Skin.2FCape}
 */
function getProfile (profileId) {
  return got(`${SESSION_API}/session/minecraft/profile/${profileId}`, {
    headers: { 'user-agent': USER_AGENT },
    json: true
  })
    .then(res => {
      if (res.statusCode === 204) throw new Error('no such profile')
      const {id, name, properties} = res.body
      if (properties[0].name !== 'textures') throw new Error(`textures missing: ${id}`)
      const {timestamp, textures} = JSON.parse(Base64.decode(properties[0].value))
      return {
        id,
        name,
        timestamp,
        skin: textures.SKIN && textures.SKIN.url,
        cape: textures.CAPE && textures.CAPE.url
      }
    })
}

module.exports = getProfile
