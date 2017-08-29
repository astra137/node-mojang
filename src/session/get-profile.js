const got = require('got')
const {Base64} = require('js-base64')
const {USER_AGENT, SESSION_API} = require('../constants')

/**
 * A special service that returns a profile's name, skin URL, and cape URL.
 *
 * **Rate limit: You can request the same profile once per minute.**
 *
 * @param {String} profileId - profile UUID of a player
 * @returns {Promise.<Object>} resolves to `{id, name, timestamp, skin, cape, isSlim}`
 * @see {@link http://wiki.vg/Mojang_API#UUID_-.3E_Profile_.2B_Skin.2FCape}
 */
function getProfile (profileId) {
  return got(`${SESSION_API}/session/minecraft/profile/${profileId}`, {
    headers: { 'user-agent': USER_AGENT },
    json: true
  })
    .catch(err => {
      if (err.response) {
        err.name = err.response.body.error
        err.message = err.response.body.errorMessage
      }
      throw err
    })
    .then(res => {
      if (res.statusCode === 204) throw new Error('no such profile')
      const {id, name, properties} = res.body
      if (properties[0].name !== 'textures') throw new Error(`textures missing: ${id}`)
      const {timestamp, textures} = JSON.parse(Base64.decode(properties[0].value))
      const {SKIN, CAPE} = textures
      return {
        id,
        name,
        timestamp,
        skin: SKIN && SKIN.url,
        cape: CAPE && CAPE.url,
        isSlim: SKIN && SKIN.metadata && SKIN.metadata.model === 'slim'
      }
    })
}

module.exports = getProfile
