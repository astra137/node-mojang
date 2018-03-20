const parse = require('./parse-res-bearer')

// All Mojang endpoints return errors in the same format.
// This attaches API responses to the errors being thrown.
// https://github.com/axios/axios#handling-errors
// http://wiki.vg/Authentication#Errors
/* eslint-disable camelcase */
module.exports = function onApiError (err) {
  if (err.response) {
    const {error, errorMessage, cause} = err.response.data
    const {error_description} = parse(err.response.headers['www-authenticate'])
    err.message = error_description || errorMessage || err.message
    if (error) err.name = error // overwrite name if available
    if (cause) err.cause = cause // only on some endpoints
  }
  throw err
}
