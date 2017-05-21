'use strict';

const https = require('https');
/**
 * Performs a HTTP request to a given target
 * @param {Object} options http request options
 * @param {Object} body http request body
 * @param {Boolean} strictMode enable/disable strict mode
 * @returns {Promise<Object>}
 */
function _request(options, body, strictMode) {
  if (typeof strictMode === 'undefined') strictMode = true;
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
        if(resp.statusCode == 204 && strictMode) {
          return reject(new Error('Empty response'));
        }
        if(data.length == 0) {
          return resolve({});
        }
        data = JSON.parse(Buffer.concat(data).toString());
        if (data.hasOwnProperty('error')) return reject(new Error(data.error));
        
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
