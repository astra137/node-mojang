'use strict';

const request = require('./_request');

function signout(username, password) {
  return request({
    method: 'POST',
    hostname: 'authserver.mojang.com',
    path: '/signout',
  }, {
    username: username,
    password: password,
  });
}

module.exports = signout;
