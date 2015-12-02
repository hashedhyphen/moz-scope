'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

require('babel-polyfill');

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var File = (function () {
  function File() {
    _classCallCheck(this, File);
  }

  _createClass(File, null, [{
    key: 'readConfig',
    value: function readConfig() {
      var config_path = './test/config.json';

      return new Promise(function (resolve, reject) {
        _fs2.default.readFile(config_path, function (err, buf) {
          if (err) {
            console.error('failed to read config.json');
            reject(err);
          } else {
            resolve(JSON.parse(buf.toString('utf8')));
          }
        });
      });
    }
  }]);

  return File;
})();

exports.default = File;