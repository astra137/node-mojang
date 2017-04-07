'use strict';

const request = require('./_request');

function auth(username, password, clientToken, appAgent) {
  return request({
    method: 'POST',
    hostname: 'authserver.mojang.com',
    path: '/authenticate',
  }, {
    username: username,
    password: password,
    clientToken: clientToken,
    agent: appAgent
  });
}

module.exports = auth;
