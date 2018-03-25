const {Base64} = require('js-base64')
const fetch = require('node-fetch')
const handleErrors = require('../handle-errors')
const {USER_AGENT, SESSION_API} = require('../constants')

/**
 * A special service that returns a profile's name, skin URL, and cape URL.
 *
 * *This endpoint is used by the official launcher to load the current skin.*
 *
 * **Rate limit: You can request the same profile once per minute.**
 *
 * @param {string} profileId - profile UUID of a player
 * @returns {Promise<CustomSession>} resolves if profile exists
 * @see {@link http://wiki.vg/Mojang_API#UUID_-.3E_Profile_.2B_Skin.2FCape}
 */
function getSession (profileId) {
  return fetch(`${SESSION_API}/session/minecraft/profile/${profileId}`, {
    headers: {
      'user-agent': USER_AGENT,
      'accept': 'application/json'
    }
  })
    .then(handleErrors)
    .then(res => {
      if (res.status === 204) throw new Error('no such profile')
      return res.json()
    })
    .then(({id, name, properties}) => {
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

module.exports = getSession
