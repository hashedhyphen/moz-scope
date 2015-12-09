#!/usr/bin/env node
'use strict';

var _mozscope = require('./mozscope.js');

var _mozscope2 = _interopRequireDefault(_mozscope);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

switch (process.argv[2]) {
  case '-v':
  case '--version':
    _mozscope2.default.showVersion();
    break;
  default:
    _mozscope2.default.showUpdates();
}