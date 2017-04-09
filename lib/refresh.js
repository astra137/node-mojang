'use strict';

const request = require('./_request');

/**
 * Refreshes a given access token
 * 
 * @param {String} accessToken - required. valid access token
 * @param {String} clientToken - required. client token (needs to be identical to the one used to obtain the access token)
 * @param {Object} profile - optional? Player profile information
 * @param {String} profile.id - Player id
 * @param {String} profile.name - Player name
 * @returns {Promise.<Object>} - Promise which resolves to a user object containing a new access token, player and account information
 * @see {@link http://wiki.vg/Authentication#Refresh} for a detailed documentation of the endpoint
 */
function refresh(accessToken, clientToken, profile) {
  return request({
    method: 'POST',
    hostname: 'authserver.mojang.com',
    path: '/refresh',
  }, {
    accessToken: accessToken,
    clientToken: clientToken,
    selectedProfile: profile,
  });
}

module.exports = refresh;
