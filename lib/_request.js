'use strict';

const https = require('https');

function _request(options, body) {
  return Promise(function(resolve, reject) {
    const request = http.request(options, function(resp) {
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
      request.end(JSON.stringify(body));
    } else if (typeof body !== 'undefined') {
      request.end(body);
    }
  });
}

module.exports = _request;
