const {name, version, homepage} = require('../package.json')

// TODO debug library, other?
// console.debug is only available in node 8
console.info('user-agent', `${name}/${version} (${homepage})`)

exports.USER_AGENT = `${name}/${version} (${homepage})`
exports.MOJANG_API = 'https://api.mojang.com'
exports.STATUS_API = 'https://status.mojang.com'
exports.SESSION_API = 'https://sessionserver.mojang.com'
exports.YGGDRASIL_API = 'https://authserver.mojang.com'
