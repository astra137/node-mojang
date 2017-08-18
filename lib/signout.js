const yggdrasil = require('./endpoints/yggdrasil')

/**
 * Invalidates access tokens for a given account.
 *
 * @param {String} username - required. Valid username of a Mojang account
 * @param {String} password - required. Password for the given account
 * @returns {Promise.<String>} - empty payload if successful
 * @see {@link http://wiki.vg/Authentication#Signout} for more detailed information
 */
function signout (username, password) {
  return yggdrasil('/signout', {
    body: {
      username,
      password
    }
  })
}

module.exports = signout
