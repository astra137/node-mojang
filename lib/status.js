'use strict';

const https = require('https');

function status() {
  return new Promise(function(resolve, reject) {
    https.request({
      method: 'GET',
      port: 443,
      hostname: 'status.mojang.com',
      path: '/check',
    }, function(resp) {
      let data = [];
      resp.on('data', function(chunk) {
        data.push(chunk);
      });

      resp.on('end', function() {
        const result = JSON.parse(Buffer.concat(data).toString());
        let fix = {};
        result.forEach(x => {
          for (let name in x) {
            fix[name] = x[name];
          } 
        });
        resolve(fix);
      });
    }).end();
  });
}

module.exports = status;
