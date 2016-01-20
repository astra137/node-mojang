'use strict';

const request = require('./_request');

function username(uuid) {
  if (Array.isArray(uuid)) {
    let master = [];
    uuid.forEach(u => master.push(username(u)));
    return Promise.all(master);
  }

  return request({
    hostname: 'sessionserver.mojang.com',
    path: '/session/minecraft/profile/' + uuid,
  });
}

module.exports = username;
