const {status: statusAPI} = require('../agents')

/**
 * Returns status of various Mojang services in a more helpful format.
 *
 * @returns {Promise<Array>} resolves a list like `[{hostname, color, isAvailable, hasIssues}]`
 * @see {@link http://wiki.vg/Mojang_API#API_Status}
 */
function status () {
  return statusAPI.get(`/check`)
    .then(({data}) => data)
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
