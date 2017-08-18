const got = require('got')
const userAgent = require('./_user-agent')

module.exports = function (endpoint, body) {
  return got(`https://authserver.mojang.com${endpoint}`, {
    headers: { 'user-agent': userAgent },
    json: true,
    body
  })
    .then(res => res.body)
    .catch(err => {
      if (err.response) {
        err.name = err.response.body.error
        err.message = err.response.body.errorMessage
        err.cause = err.response.body.cause
        throw err
      } else {
        throw err
      }
    })
}
