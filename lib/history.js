'use strict'

const request = require('./_request')

/**
 * Gets all name changes for a given player
 *
 * @param {String} uuid - required. UUID of a player
 * @returns {Promsie.<Array>} - Promsie which resolves to an array of name changes, containing a timestamp and the new name
 * @see {@link http://wiki.vg/Mojang_API#UUID_-.3E_Name_history} for a detailed documentation of the endpoint
 */
function history (uuid) {
  if (Array.isArray(uuid)) {
    let master = []
    uuid.forEach(u => master.push(history(u)))
    return master
  }

  return request({
    hostname: 'api.mojang.com',
    path: '/user/profiles/' + uuid + '/names'
  })
}

module.exports = history
