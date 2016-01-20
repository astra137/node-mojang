'use strict';

const request = require('./_request');

function auth(username, password, clientToken) {
  return request({
    method: 'POST',
    hostname: 'authserver.mojang.com',
    path: '/authenticate',
  }, {
    username: username,
    password: password,
    clientToken: clientToken,
  });
}

module.exports = auth;
