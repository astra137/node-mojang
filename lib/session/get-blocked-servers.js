const got = require('got')
const onApiError = require('../on-api-error')
const {USER_AGENT, SESSION_API} = require('../constants')

/**
  * Returns a list of SHA1 hashes used to check server addresses against when the client tries to connect.
  *
  * *See {@link http://wiki.vg/Mojang_API#Blocked_Servers} for how this list is used.*
  * @returns {Promise<Array<String>>} resolves to a list of address hashes
  */
function getBlockedServers () {
  return got(`${SESSION_API}/blockedservers`, {
    headers: { 'user-agent': USER_AGENT }
  })
    .catch(onApiError)
    .then(res => res.body.split('\n').slice(0, -1))
}

module.exports = getBlockedServers
