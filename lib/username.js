'use strict';

const request = require('./_request');

function username(user, date) {
  if (Array.isArray(user)) {
    let master = [];
    user.forEach(u => master.push(username(u, date)));
    return Promise.all(master);
  }

  if (typeof user === 'object') {
    let master = [];
    let timestamp = '';
    for (let u in user) {
      timestamp = user[u];
      master.push(username(u, timestamp));
    }
    return Promise.all(master);
  }

  date = new Date(date).getDate() || Date.now();

  return request({
    hostname: 'api.mojang.com',
    path: '/users/profiles/minecraft/' + user + '?at=' + date,
  });
}

module.exports = username;
