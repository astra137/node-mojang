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
}
