const statusapi = require('./endpoints/statusapi')

/**
 * Returns status of various Mojang services in a custom format.
 * @see {@link http://wiki.vg/Mojang_API#API_Status}
 */
function status () {
  return statusapi('/check')
    .then(res => res.body)
    .then((sites) => sites.reduce((acc, val) => {
      const name = Object.keys(val)[0]
      acc[name] = {
        isAvailable: val[name] === 'green' || val[name] === 'yellow',
        hasIssues: val[name] === 'yellow' || val[name] === 'red'
      }
      return acc
    }, []))
}

module.exports = status
