#!/usr/bin/env node
'use strict';

var _mozscope = require('./mozscope.js');

var _mozscope2 = _interopRequireDefault(_mozscope);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  switch (process.argv[2]) {
    case '-h':
    case '--help':
      return _mozscope2.default.showHelp();
    case '-r':
    case '--reset':
      return _mozscope2.default.resetTable();
    case '-v':
    case '--version':
      return _mozscope2.default.showVersion();
    default:
      return _mozscope2.default.showUpdates();
  }
})();