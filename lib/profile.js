'use strict'

const request = require('./_request')

/**
 * Gets the profile information of a player
 *
 * @param {String} uuid - required. UUID of a player
 * @returns {Promise.<Object>} - Promise which resolves to a profile object containing player id, username and skin information
 * @see {@link http://wiki.vg/Mojang_API#UUID_-.3E_Profile_.2B_Skin.2FCape} for a detailed documentation of the endpoint
 */
function username (uuid) {
  if (Array.isArray(uuid)) {
    let master = []
    uuid.forEach(u => master.push(username(u)))
    return Promise.all(master)
  }

  return request({
    hostname: 'sessionserver.mojang.com',
    path: '/session/minecraft/profile/' + uuid
  })
}

module.exports = username
