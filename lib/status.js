const statusapi = require('./endpoints/statusapi')

/**
 * Returns status of various Mojang services in a custom format.
 *
 * @see {@link http://wiki.vg/Mojang_API#API_Status}
 */
function status () {
  return statusapi('/check')
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

module.exports = status
