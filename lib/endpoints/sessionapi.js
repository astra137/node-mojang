const got = require('got')
const userAgent = require('./_user-agent')

module.exports = function (endpoint, body) {
  return got(`https://sessionserver.mojang.com${endpoint}`, {
    headers: { 'user-agent': userAgent },
    json: true,
    body
  })
}
