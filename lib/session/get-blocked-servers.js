const fetch = require('node-fetch')
const handleErrors = require('../handle-errors')
const {USER_AGENT, SESSION_API} = require('../constants')

/**
  * Returns a list of SHA1 hashes used to check server addresses against when the client tries to connect.
  *
  * *See {@link http://wiki.vg/Mojang_API#Blocked_Servers} for how this list is used.*
  *
  * @returns {Promise<Array<string>>} resolves to a list of address hashes
  */
function getBlockedServers () {
  return fetch(`${SESSION_API}/blockedservers`, {
    headers: {
      'user-agent': USER_AGENT
    }
  })
    .then(handleErrors)
    .then(res => res.text())
    .then(text => text.split('\n').slice(0, -1))
}

module.exports = getBlockedServers
