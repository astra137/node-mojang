const {name, version, homepage} = require('../../package.json')

console.info('user-agent', `${name}/${version} (${homepage})`)

module.exports = `${name}/${version} (${homepage})`
