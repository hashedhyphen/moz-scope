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

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { var callNext = step.bind(null, "next"); var callThrow = step.bind(null, "throw"); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(callNext, callThrow); } } callNext(); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Converter = (function () {
  function Converter() {
    _classCallCheck(this, Converter);
  }

  _createClass(Converter, null, [{
    key: 'exec',
    value: (function () {
      var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(config) {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt('return', new Promise((function () {
                  var _this = this;

                  var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(resolve, reject) {
                    var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, url, body, info;

                    return regeneratorRuntime.wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            _context.prev = 0;
                            _iteratorNormalCompletion = true;
                            _didIteratorError = false;
                            _iteratorError = undefined;
                            _context.prev = 4;
                            _iterator = Object.keys(config)[Symbol.iterator]();

                          case 6:
                            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                              _context.next = 20;
                              break;
                            }

                            url = _step.value;
                            _context.next = 10;
                            return _request2.default.fetch(url);

                          case 10:
                            body = _context.sent;

                            console.log(body);
                            console.log(url + ' length: ' + body.length);
                            _context.next = 15;
                            return _lexer2.default.exec(body);

                          case 15:
                            info = _context.sent;

                            console.log(info);

                          case 17:
                            _iteratorNormalCompletion = true;
                            _context.next = 6;
                            break;

                          case 20:
                            _context.next = 26;
                            break;

                          case 22:
                            _context.prev = 22;
                            _context.t0 = _context['catch'](4);
                            _didIteratorError = true;
                            _iteratorError = _context.t0;

                          case 26:
                            _context.prev = 26;
                            _context.prev = 27;

                            if (!_iteratorNormalCompletion && _iterator.return) {
                              _iterator.return();
                            }

                          case 29:
                            _context.prev = 29;

                            if (!_didIteratorError) {
                              _context.next = 32;
                              break;
                            }

                            throw _iteratorError;

                          case 32:
                            return _context.finish(29);

                          case 33:
                            return _context.finish(26);

                          case 34:
                            resolve(200);
                            _context.next = 41;
                            break;

                          case 37:
                            _context.prev = 37;
                            _context.t1 = _context['catch'](0);

                            console.error('converter.js');
                            reject(_context.t1);

                          case 41:
                          case 'end':
                            return _context.stop();
                        }
                      }
                    }, _callee, _this, [[0, 37], [4, 22, 26, 34], [27,, 29, 33]]);
                  }));

                  return function (_x2, _x3) {
                    return ref.apply(this, arguments);
                  };
                })()));

              case 1:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      return function exec(_x) {
        return ref.apply(this, arguments);
      };
    })()
  }]);

  return Converter;
})();

exports.default = Converter;