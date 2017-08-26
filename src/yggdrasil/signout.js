const got = require('got')
const {USER_AGENT, YGGDRASIL_API} = require('../constants')
const handle = require('./handle-response')

/**
 * Invalidates access tokens for a given account.
 *
 * @param {String} username - required. Valid username of a Mojang account
 * @param {String} password - required. Password for the given account
 * @returns {Promise} - resolves if credentials were correct
 * @see {@link http://wiki.vg/Authentication#Signout}
 */
function signout (username, password) {
  return handle(got(`${YGGDRASIL_API}/signout`, {
    headers: { 'user-agent': USER_AGENT },
    json: true,
    body: {
      username,
      password
    }
  }))
}

module.exports = signout
