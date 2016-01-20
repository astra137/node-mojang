'use strict';

const https = require('https');

function _request(options, body) {
  return new Promise(function(resolve, reject) {
    const request = https.request(Object.assign({
      hostname: 'api.mojang.com',
      headers: { 'Content-Type': 'application/json' },
    }, options), function(resp) {
      let data = [];

      resp.on('data', function(chunk) {
        data.push(chunk);
      });

      resp.on('end', function() {
        data = JSON.parse(Buffer.concat(data).toString());
        resolve(data);
      });

      resp.on('error', reject);
    });
    request.on('error', reject);

    if (typeof body === 'object' && !(body instanceof Buffer)) {
      request.write(JSON.stringify(body));
    } else if (typeof body !== 'undefined') {
      request.write(body);
    }
    request.end();
  });
}

module.exports = _request;
