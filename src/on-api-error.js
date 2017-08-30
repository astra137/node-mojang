const parse = require('./parse-res-bearer')

// Mojang endpoints all return errors in the same format.
// This attaches those values to the error being thrown.
// https://github.com/sindresorhus/got#errors
module.exports = function onError (err) {
  if (err.name === 'HTTPError' && err.headers['www-authenticate']) {
    const {error, error_description} = parse(err.headers['www-authenticate'])
    err.name = error
    err.message = error_description // eslint-disable-line camelcase
  } else if (err.name === 'HTTPError' && err.response) {
    err.name = err.response.body.error
    err.message = err.response.body.errorMessage
    err.cause = err.response.body.cause
  }
  throw err
}
