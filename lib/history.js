var request = require('request-promise');
var routine = require('promise-routine');

module.exports = function history(id) {
  if (id.constructor === Array) {
    return routine(history, id);
  }

  return request({
    uri: 'https://api.mojang.com/user/profiles/' + id + '/names',
    json: true
  });
};
