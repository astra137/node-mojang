const {yggdrasil} = require('../agents')
const onApiError = require('../on-api-error')

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
  return yggdrasil.post(`/signout`, {
    username,
    password
  })
    .catch(onApiError)
    .then(({data}) => data)
}

module.exports = signout
