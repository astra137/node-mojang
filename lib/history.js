'use strict';

const https = require('https');

function history(uuid) {
  return new Promise(function(resolve, reject) {
    https.request({
      method: 'GET',
      hostname: 'api.mojang.com',
      path: '/user/profiles/' + uuid + '/names',
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

module.exports = history;
