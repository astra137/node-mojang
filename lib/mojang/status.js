const fetch = require('node-fetch')
const handleErrors = require('../handle-errors')
const {USER_AGENT, STATUS_API} = require('../constants')

/**
 * Returns status of various Mojang services in a more helpful format.
 *
 * @returns {Promise<Array>} resolves a list like `[{hostname, color, isAvailable, hasIssues}]`
 * @see {@link http://wiki.vg/Mojang_API#API_Status}
 */
function status () {
  return fetch(`${STATUS_API}/check`, {
    headers: {
      'user-agent': USER_AGENT,
      'accept': 'application/json'
    }
  })
    .then(handleErrors) // NOTE I wonder how /check can fail
    .then(res => res.json())
    .then((sites) => sites.reduce((acc, val) => {
      const hostname = Object.keys(val)[0]
      acc.push({
        hostname,
        color: val[hostname],
        isAvailable: val[hostname] === 'green' || val[hostname] === 'yellow',
        hasIssues: val[hostname] === 'yellow' || val[hostname] === 'red'
      })
      return acc
    }, []))
}

module.exports = status
