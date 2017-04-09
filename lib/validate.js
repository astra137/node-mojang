'use strict';

const request = require('./_request');

/**
 * Checks if a access token is suitable for authentication with a Minecraft server
 * 
 * @param {String} accessToken - required. The access token to be checked
 * @param {String} clientToken - optional. If set, it should match the one used to obtain the access token
 * @returns {Promise.<String>} - returns an empty payload if successful
 * @see {@link http://wiki.vg/Authentication#Validate} for more detailed information
 */
function validate(accessToken, clientToken) {
  return request({
    method: 'POST',
    hostname: 'authserver.mojang.com',
    path: '/validate',
  }, {
    accessToken: accessToken,
    clientToken: clientToken,
  });
}

module.exports = validate;
