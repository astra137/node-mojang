// Used to extract the authorization error from an API response
module.exports = function parseBearer (wwwauthorization) {
  if (!wwwauthorization) return {}
  const [, value] = wwwauthorization.split('Bearer ')
  const pairs = value.split(', ')
  return pairs.reduce((acc, val) => {
    const [a, b] = val.split('=')
    acc[a] = JSON.parse(b)
    return acc
  }, {})
}
