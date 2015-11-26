'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

require('babel-polyfill');

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { var callNext = step.bind(null, "next"); var callThrow = step.bind(null, "throw"); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(callNext, callThrow); } } callNext(); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MozScope = (function () {
  function MozScope() {
    _classCallCheck(this, MozScope);
  }

  _createClass(MozScope, null, [{
    key: 'showVersion',
    value: function showVersion() {
      console.log(MozScope.VERSION);
    }
  }, {
    key: 'queryUpdates',
    value: (function () {
      var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        var config;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return readConfig();

              case 3:
                config = _context.sent;

                console.log(config);
                _context.next = 10;
                break;

              case 7:
                _context.prev = 7;
                _context.t0 = _context['catch'](0);
                console.error(_context.t0);
              case 10:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 7]]);
      }));

      return function queryUpdates() {
        return ref.apply(this, arguments);
      };
    })()
  }, {
    key: 'VERSION',
    get: function get() {
      return '0.0.0';
    }
  }]);

  return MozScope;
})();

exports.default = MozScope;

var readConfig = function readConfig() {
  var config_path = './test/config.json';
  return new Promise(function (resolve, reject) {
    _fs2.default.readFile(config_path, function (err, buf) {
      if (err) {
        console.error('Error: failed to read config.json');
        reject(err);
      } else {
        resolve(JSON.parse(buf.toString('ascii')));
      }
    });
  });
};