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

var Converter = (function () {
  function Converter() {
    _classCallCheck(this, Converter);
  }

  _createClass(Converter, null, [{
    key: 'exec',
    value: (function () {
      var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(config) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                return _context3.abrupt('return', new Promise((function () {
                  var _this2 = this;

                  var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(resolve, reject) {
                    var updates;
                    return regeneratorRuntime.wrap(function _callee2$(_context2) {
                      while (1) {
                        switch (_context2.prev = _context2.next) {
                          case 0:
                            _context2.prev = 0;
                            _context2.next = 3;
                            return Promise.all(Object.keys(config).map(function (url) {
                              return new Promise((function () {
                                var _this = this;

                                var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(resolve, reject) {
                                  var body;
                                  return regeneratorRuntime.wrap(function _callee$(_context) {
                                    while (1) {
                                      switch (_context.prev = _context.next) {
                                        case 0:
                                          _context.prev = 0;
                                          _context.next = 3;
                                          return _request2.default.fetch(url);

                                        case 3:
                                          body = _context.sent;

                                          resolve(_lexer2.default.exec(body));
                                          _context.next = 10;
                                          break;

                                        case 7:
                                          _context.prev = 7;
                                          _context.t0 = _context['catch'](0);
                                          reject(_context.t0);
                                        case 10:
                                        case 'end':
                                          return _context.stop();
                                      }
                                    }
                                  }, _callee, _this, [[0, 7]]);
                                }));

                                return function (_x4, _x5) {
                                  return ref.apply(this, arguments);
                                };
                              })());
                            }));

                          case 3:
                            updates = _context2.sent;

                            resolve(updates);
                            _context2.next = 11;
                            break;

                          case 7:
                            _context2.prev = 7;
                            _context2.t0 = _context2['catch'](0);

                            console.error('converter.js');
                            reject(_context2.t0);

                          case 11:
                          case 'end':
                            return _context2.stop();
                        }
                      }
                    }, _callee2, _this2, [[0, 7]]);
                  }));

                  return function (_x2, _x3) {
                    return ref.apply(this, arguments);
                  };
                })()));

              case 1:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      return function exec(_x) {
        return ref.apply(this, arguments);
      };
    })()
  }]);

  return Converter;
})();

exports.default = Converter;