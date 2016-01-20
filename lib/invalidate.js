'use strict';

const request = require('./_request');

function invalidate(accessToken, clientToken) {
  return request({
    method: 'POST',
    hostname: 'authserver.mojang.com',
    path: '/invalidate',
  }, {
    accessToken: accessToken,
    clientToken: clientToken,
  });
}

module.exports = invalidate;
