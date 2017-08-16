const got = require('got')
const {name, version, homepage} = require('../../package.json')

console.info('user-agent', `${name}/${version} (${homepage})`)

module.exports = function (endpoint, options) {
  return got(`https://authserver.mojang.com${endpoint}`, Object.assign({
    json: true,
    headers: {
      'user-agent': `${name}/${version} (${homepage})`,
      'content-type': 'application/json'
    }
  }, options))
    .catch(err => {
      if (err.response) {
        const apiError = new Error()
        apiError.name = err.response.error
        apiError.message = err.response.errorMessage
        apiError.cause = err.response.cause
        throw apiError
      } else {
        throw err
      }
    })
}
