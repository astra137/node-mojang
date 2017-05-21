'use strict';

const request = require('./_request');

/**
 * Invalidate an obtained access token
 * 
 * @param {String} accessToken - required. access token to be invalidated
 * @param {String} clientToken - required. client token (needs to be identical to the one you used to obtain the access token)
 * @returns {Promise.<String>} - empty response if successful
 * @see {@link http://wiki.vg/Authentication#Endpoint_5} for a detailed documentation of the endpoint
 */
function invalidate(accessToken, clientToken) {
  return request({
    method: 'POST',
    hostname: 'authserver.mojang.com',
    path: '/invalidate',
  }, {
    accessToken: accessToken,
    clientToken: clientToken,
  }, false);
}

module.exports = invalidate;
