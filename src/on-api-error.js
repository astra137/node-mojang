const parse = require('./parse-res-bearer')

// All Mojang endpoints return errors in the same format.
// This attaches API responses to the errors being thrown.
// https://github.com/sindresorhus/got#errors
// http://wiki.vg/Authentication#Errors
/* eslint-disable camelcase */
module.exports = function onError (err) {
  if (err.name === 'HTTPError') {
    const {error, errorMessage, cause} = err.response.body
    const {error_description} = parse(err.headers['www-authenticate'])
    err.message = error_description || errorMessage || err.message
    if (error) err.name = error // overwrite name if available
    if (cause) err.cause = cause // only on some endpoints
  }
  throw err
}
