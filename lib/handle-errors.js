const parse = require('./parse-res-bearer')

module.exports = function (res) {
  if (res.ok) return res

  // handle bad auth
  /* eslint-disable camelcase */
  const {error_description} = parse(res.headers.get('www-authenticate'))

  // handle json responses from API
  if (res.headers.get('content-type') === 'application/json') {
    return res.json().then(json => {
      const {error, errorMessage, cause} = json
      const err = new Error(error_description || errorMessage || res.statusText)
      if (error) err.name = error
      if (cause) err.cause = cause
      err.response = res
      throw err
    })
  }

  // handle all other errors without downloading response
  const err = new Error(res.statusText)
  err.response = res
  throw err
}
