const got = require('got')
const userAgent = require('./_user-agent')

module.exports = function (endpoint, body) {
  return got(`https://status.mojang.com${endpoint}`, {
    headers: { 'user-agent': userAgent },
    json: true,
    body
  })
    .then(res => res.body)
}
