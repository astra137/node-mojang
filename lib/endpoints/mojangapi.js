const got = require('got')
const userAgent = require('./_user-agent')

module.exports = function (endpoint, accessToken, body) {
  const headers = {'user-agent': userAgent}
  if (accessToken) headers.authorization = `Bearer ${accessToken}`
  return got(`https://api.mojang.com${endpoint}`, {
    headers,
    json: true,
    body
  })
}
