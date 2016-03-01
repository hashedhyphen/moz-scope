'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _os = require('os');

var _os2 = _interopRequireDefault(_os);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Config = function () {
  function Config() {
    _classCallCheck(this, Config);
  }

  _createClass(Config, null, [{
    key: 'read',
    value: function read() {
      return new Promise(function (resolve, reject) {
        _fs2.default.readFile(Config.PATH, function (err, buf) {
          if (err) {
            console.error('failed to read mozscope.conf');
            return reject(err);
          }

          var urls = buf.toString('utf8').split(_os2.default.EOL);
          resolve(urls.filter(function (entry) {
            return entry.length > 0;
          }));
          // exclude empty lines
        });
      });
    }
  }, {
    key: 'PATH',
    get: function get() {
      return _os2.default.homedir() + '/mozscope.conf';
    }
  }]);

  return Config;
}();

exports.default = Config;