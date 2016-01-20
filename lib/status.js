'use strict';

const request = require('./_request');

function status() {
  return request({
    hostname: 'status.mojang.com',
    path: '/check',
  }).then(function(sites) {
    let fix = {};
    sites.forEach(function(site) {
      for (let name in site) {
        fix[name] = site[name];
      }
    });
    return fix;
  });
}

module.exports = status;
