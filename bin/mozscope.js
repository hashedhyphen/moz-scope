'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

require('babel-polyfill');

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _controller = require('./controller.js');

var _controller2 = _interopRequireDefault(_controller);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } step("next"); }); }; }

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
    key: 'showUpdates',
    value: (function () {
      var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        var config, updates;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return readConfig();

              case 3:
                config = _context.sent;
                _context.next = 6;
                return _controller2.default.queryUpdates(config);

              case 6:
                updates = _context.sent;

                console.log(updates);
                console.log('end');
                _context.next = 14;
                break;

              case 11:
                _context.prev = 11;
                _context.t0 = _context['catch'](0);
                console.error(_context.t0);
              case 14:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 11]]);
      }));

      return function showUpdates() {
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

function readConfig() {
  var config_path = './test/config.json';

  return new Promise(function (resolve, reject) {
    _fs2.default.readFile(config_path, function (err, buf) {
      if (err) {
        console.error('Error: failed to read config.json');
        reject(err);
      } else {
        resolve(JSON.parse(buf.toString('utf8')));
      }
    });
  });
}