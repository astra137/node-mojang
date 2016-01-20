'use strict';

const request = require('./_request');

function validate(accessToken, clientToken) {
  return request({
    method: 'POST',
    hostname: 'authserver.mojang.com',
    path: '/validate',
  }, {
    accessToken: accessToken,
    clientToken: clientToken,
  });
}

module.exports = validate;
