'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _uuid = require('./uuid');

var _uuid2 = _interopRequireDefault(_uuid);

var _history = require('./history');

var _history2 = _interopRequireDefault(_history);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = { uuid: _uuid2.default, history: _history2.default };
module.exports = exports['default'];