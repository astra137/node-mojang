'use strict';

const request = require('./_request');

/**
 * Returns information on the logged in Mojang account.
 * 
 * @param {String} accessToken - required. The access token to authorize the request
 * @returns {Promise.<Object>} - Promise which resolves to detailed information on the user. See the wiki for specifics.
 * @see {@link http://wiki.vg/Mojang_API#User_Info} for more detailed information
 */
function user(accessToken){
    return request({
        method: 'GET',
        hostname: 'api.mojang.com',
        path: '/user',
        headers: {
            Authorization: ' Bearer ' + accessToken
        }
    });
}

module.exports = user;