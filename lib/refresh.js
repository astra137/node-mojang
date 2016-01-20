'use strict';

const request = require('./_request');

function refresh(accessToken, clientToken, profile) {
  return request({
    method: 'POST',
    hostname: 'authserver.mojang.com',
    path: '/refresh',
  }, {
    accessToken: accessToken,
    clientToken: clientToken,
    selectedProfile: profile,
  });
}

module.exports = refresh;
