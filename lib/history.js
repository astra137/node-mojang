'use strict';

const request = require('./_request');

function history(uuid) {
  if (Array.isArray(uuid)) {
    let master = [];
    uuid.forEach(u => master.push(history(u)));
    return master;
  }

  return request({
    hostname: 'api.mojang.com',
    path: '/user/profiles/' + uuid + '/names',
  });
}

module.exports = history;
