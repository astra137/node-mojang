'use strict';

const https = require('https');

function username(username, date) {
  date = date || Date.now()

  return new Promise(function(resolve, reject) {
    https.request({
      method: 'GET',
      hostname: 'api.mojang.com',
      path: '/users/profiles/minecraft/' + username + '?at=' + date,
    }, function(resp) {
      let data = [];

      resp.on('data', function(chunk) {
        data.push(chunk);
      });

      resp.on('end', function() {
        resolve(JSON.parse(Buffer.concat(data).toString()));
      });

    }).end();
  });
}

module.exports = username;
