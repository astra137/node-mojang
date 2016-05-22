var request = require('request-promise');

module.exports = function status() {
  return request({
    uri: 'https://status.mojang.com/check',
    json: true
  }).then(function(statuses) {
    var res = {};
    for (var i = 0, max = statuses.length; i < max; i++) {
      var status = statuses[i];
      var key = Object.keys(status)[0];
      var value = status[key];
      res[key] = value;
    }
    return res;
  });
};
