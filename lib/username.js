var request = require('request-promise');
var routine = require('promise-routine');
var objToArr = require('object-to-array');

module.exports = function username(user, stamp) {
  if (user.constructor === Array) {
    if (stamp) {
      return routine(username, user.map(function(item) {
        return [item, stamp];
      }));
    }

    return request({
      uri: 'https://api.mojang.com/profiles/minecraft/',
      method: 'POST',
      json: true,
      body: user
    });
  }

  if (user.constructor === Object) {
    var input = objToArr(user);
    return routine(username, input);
  }

  return request({
    uri: 'https://api.mojang.com/users/profiles/minecraft/' + user + (stamp ? '?at=' + stamp : ''),
    json: true
  });
};
