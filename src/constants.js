const {name, version, homepage} = require('../package.json')

console.debug('user-agent', `${name}/${version} (${homepage})`)

exports.USER_AGENT = `${name}/${version} (${homepage})`
exports.MOJANG_API = 'https://api.mojang.com'
exports.STATUS_API = 'https://status.mojang.com'
exports.SESSION_API = 'https://sessionserver.mojang.com'
exports.YGGDRASIL_API = 'https://authserver.mojang.com'
