'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _https = require('https');

var _https2 = _interopRequireDefault(_https);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Request = (function () {
  function Request() {
    _classCallCheck(this, Request);
  }

  _createClass(Request, null, [{
    key: 'queryPage',
    value: function queryPage(url) {
      var origin = 'https://developer.mozilla.org';

      return new Promise(function (resolve, reject) {
        try {
          if (!url.startsWith(origin)) {
            throw 'URL\'s origin is invalid';
          }

          _https2.default.get(url, function (res) {
            if (res.statusCode !== 200) {
              throw 'Got non-200 status code: ' + res.statusCode;
            }

            res.setEncoding('utf8');
            res.on('data', function (chunk) {
              return console.log(chunk);
            });
            res.on('end', function () {
              return resolve();
            });
          }).on('error', function (err) {
            throw err;
          });
        } catch (err) {
          reject(err);
        }
      });
    }
  }]);

  return Request;
})();

exports.default = Request;