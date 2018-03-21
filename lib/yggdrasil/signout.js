const fetch = require('node-fetch')
const handleErrors = require('../handle-errors')
const {USER_AGENT, YGGDRASIL_API} = require('../constants')

/**
  * Invalidates access tokens of a given Mojang account.
  *
  * @param {Object} credentials - account credentials
  * @param {string} credentials.username - email or username of a Mojang account
  * @param {string} credentials.password - password for the given account
  * @returns {Promise} resolves only if credentials were correct
  * @see {@link http://wiki.vg/Authentication#Signout}
  * @example
  * mojang.signout({username, password})
  *   .then(() => console.log('user signed out'))
  *   .catch(err => console.error(err))
  */
function signout ({username, password}) {
  return fetch(`${YGGDRASIL_API}/signout`, {
    method: 'POST',
    body: JSON.stringify({
      username,
      password
    }),
    headers: {
      'user-agent': USER_AGENT,
      'content-type': 'application/json',
      'accept': 'application/json'
    }
  })
    .then(handleErrors)
    .then(res => null)
}

module.exports = signout
