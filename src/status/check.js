const got = require('got')
const {USER_AGENT, STATUS_API} = require('../constants')

/**
 * Returns status of various Mojang services in a more helpful format.
 *
 * @returns {Array.<Object>} - a list like `[{hostname, color, isAvailable, hasIssues}]`
 * @see {@link http://wiki.vg/Mojang_API#API_Status}
 */
function check () {
  return got(`${STATUS_API}/check`, {
    headers: { 'user-agent': USER_AGENT },
    json: true
  })
    .then(res => res.body)
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

module.exports = check
