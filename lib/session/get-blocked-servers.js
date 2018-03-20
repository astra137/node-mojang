const {session} = require('../agents')
const onApiError = require('../on-api-error')

/**
  * Returns a list of SHA1 hashes used to check server addresses against when the client tries to connect.
  *
  * *See {@link http://wiki.vg/Mojang_API#Blocked_Servers} for how this list is used.*
  *
  * @returns {Promise<Array<string>>} resolves to a list of address hashes
  */
function getBlockedServers () {
  return session.get(`/blockedservers`)
    .catch(onApiError)
    .then(({data, status}) => data.split('\n').slice(0, -1))
}

module.exports = getBlockedServers
