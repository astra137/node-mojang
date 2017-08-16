'use strict'

const request = require('./_request')

/**
 * Gets the username at a given timestamp
 *
 * @param {*} user - required. The current name of the user
 * @param {Number} date - optional. UNIX Timestamp to check the username at this time. If null the current time is used. You can use 0 to get the initial name of the account, however this will only work if the name was changed at least once
 * @see {@link http://wiki.vg/Mojang_API#Username_-.3E_UUID_at_time} for more detailed information
 */
function username (user, date) {
  if (Array.isArray(user)) {
    let master = []
    user.forEach(u => master.push(username(u, date)))
    return Promise.all(master)
  }

  if (typeof user === 'object') {
    let master = []
    let timestamp = ''
    for (let u in user) {
      timestamp = user[u]
      master.push(username(u, timestamp))
    }
    return Promise.all(master)
  }

  date = new Date(date).getDate() || Date.now()

  return request({
    hostname: 'api.mojang.com',
    path: '/users/profiles/minecraft/' + user + '?at=' + date
  })
}

module.exports = username
