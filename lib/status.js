'use strict';

const request = require('./_request');

/**
 * Gets the API Status of Mojang's various services
 * @see {@link http://wiki.vg/Mojang_API#API_Status}
 */
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
