'use strict';

const https = require('https');

function username(usernames, date) {
  date = date || Date.now()

  if (!Array.isArray) usernames = [ usernames ];

  return new Promise(function(resolve, reject) {
    https.request({
      method: 'POST',
      hostname: 'api.mojang.com',
      path: '/profiles/minecraft'
    }, function(resp) {
      let data = [];

      resp.on('data', function(chunk) {
        data.push(chunk);
      });

      resp.on('end', function() {
        resolve(JSON.parse(Buffer.concat(data).toString()));
      });

    }).end(JSON.stringify(usernames));
  });
}

module.exports = username;
