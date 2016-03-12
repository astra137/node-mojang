'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = history;

var _promiseRoutine = require('promise-routine');

var _promiseRoutine2 = _interopRequireDefault(_promiseRoutine);

var _requestPromise = require('request-promise');

var _requestPromise2 = _interopRequireDefault(_requestPromise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function history(uuid) {
  if (Array.isArray(uuid)) return _promiseRoutine2.default.apply(undefined, [history].concat(_toConsumableArray(uuid)));

  return (0, _requestPromise2.default)({
    uri: 'https://api.mojang.com/user/profiles/' + uuid + '/names',
    json: true
  });
}
module.exports = exports['default'];