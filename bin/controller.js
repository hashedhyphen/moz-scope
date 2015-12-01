'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

require('babel-polyfill');

var _request = require('./request.js');

var _request2 = _interopRequireDefault(_request);

var _lexer = require('./lexer.js');

var _lexer2 = _interopRequireDefault(_lexer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Controller = (function () {
  function Controller() {
    _classCallCheck(this, Controller);
  }

  _createClass(Controller, null, [{
    key: 'queryUpdates',
    value: function queryUpdates(config) {
      return new Promise((function () {
        var _this = this;

        var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(resolve, reject) {
          var updates;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.prev = 0;
                  _context.next = 3;
                  return Promise.all(configToPromises(config));

                case 3:
                  updates = _context.sent;

                  resolve(updates);
                  _context.next = 11;
                  break;

                case 7:
                  _context.prev = 7;
                  _context.t0 = _context['catch'](0);

                  console.error('error in controller.js');
                  reject(_context.t0);

                case 11:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, _this, [[0, 7]]);
        }));

        return function (_x, _x2) {
          return ref.apply(this, arguments);
        };
      })());
    }
  }]);

  return Controller;
})();

// Fault-tolerant design
// If a resource is fetched and lexed succeessfully,
// latest info is pushed, otherwise null.

exports.default = Controller;
function configToPromises(config) {
  var urls = Object.keys(config);

  return urls.map(function (url) {
    return new Promise((function () {
      var _this2 = this;

      var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(resolve) {
        var html;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return _request2.default.fetch(url);

              case 3:
                html = _context2.sent;

                if (html) {
                  resolve(_lexer2.default.exec(html));
                } else {
                  resolve(null);
                } // when html is null
                _context2.next = 12;
                break;

              case 7:
                _context2.prev = 7;
                _context2.t0 = _context2['catch'](0);

                console.error(_context2.t0);
                console.error('captured in configToPromises');
                resolve(null); // ECONNREFUSED etc...

              case 12:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, _this2, [[0, 7]]);
      }));

      return function (_x3) {
        return ref.apply(this, arguments);
      };
    })());
  });
}