const got = require('got')
const onApiError = require('../on-api-error')
const {USER_AGENT, YGGDRASIL_API} = require('../constants')

/**
  * Invalidates access tokens of a given Mojang account.
  *
  * @param {String} username - username (email) of a Mojang account
  * @param {String} password - password for the given account
  * @returns {Promise} resolves only if credentials were correct
  * @see {@link http://wiki.vg/Authentication#Signout}
  * @example
  * mojang.signout(username, password)
  *   .then(() => console.log('user signed out'))
  *   .catch(err => console.error(err))
  */
function signout (username, password) {
  return got(`${YGGDRASIL_API}/signout`, {
    headers: { 'user-agent': USER_AGENT },
    json: true,
    body: {
      username,
      password
    }
  })
    .catch(onApiError)
    .then(res => {})
}

module.exports = signout
