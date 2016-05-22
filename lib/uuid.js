var request = require('request-promise');
var routine = require('promise-routine');

module.exports = function uuid(id) {
  if (id.constructor === Array) {
    return routine(uuid, id);
  }

  return request({
    uri: 'https://sessionserver.mojang.com/session/minecraft/profile/' + id,
    json: true
  });
};
