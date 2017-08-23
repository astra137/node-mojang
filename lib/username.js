const mojangapi = require('./endpoints/mojangapi')

/**
 * Gets the username at a given timestamp
 *
 * @param {String} name - required. The current name of the user
 * @param {Number} date - optional. UNIX Timestamp to check the username at this time. If null the current time is used. You can use 0 to get the initial name of the account, however this will only work if the name was changed at least once
 * @see {@link http://wiki.vg/Mojang_API#Username_-.3E_UUID_at_time} for more detailed information
 */
function username (name, date) {
  const query = typeof date !== 'undefined'
    ? `/users/profiles/minecraft/${name}?at=${date}`
    : `/users/profiles/minecraft/${name}`
  return mojangapi(query)
    .catch(err => {
      if (err.response) {
        err.name = err.response.body.error
        err.message = err.response.body.errorMessage
      }
      throw err
    })
    .then(res => {
      if (res.statusCode === 204) {
        throw new Error('Username does/did not exist')
      } else {
        return res.body
      }
    })
}

module.exports = username
