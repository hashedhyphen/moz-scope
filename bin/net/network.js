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

var _progress = require('./progress.js');

var _progress2 = _interopRequireDefault(_progress);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Network = (function () {
  function Network() {
    _classCallCheck(this, Network);
  }

  _createClass(Network, null, [{
    key: 'queryStateAll',
    value: (function () {
      var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(urls) {
        var _this = this;

        var _ret;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                return _context2.delegateYield(regeneratorRuntime.mark(function _callee() {
                  var progress, promises, states, hash;
                  return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                      switch (_context.prev = _context.next) {
                        case 0:
                          progress = new _progress2.default(urls.length);

                          progress.start();

                          promises = urls.map(function (url) {
                            return Network.queryState(url, progress);
                          });
                          _context.next = 5;
                          return Promise.all(promises);

                        case 5:
                          states = _context.sent;
                          hash = {};

                          states.forEach(function (state) {
                            if (state) {
                              hash[state.url] = state.info;
                            }
                            // exclude null states caused by errors
                          });
                          return _context.abrupt('return', {
                            v: hash
                          });

                        case 9:
                        case 'end':
                          return _context.stop();
                      }
                    }
                  }, _callee, _this);
                })(), 't0', 2);

              case 2:
                _ret = _context2.t0;

                if (!((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object")) {
                  _context2.next = 5;
                  break;
                }

                return _context2.abrupt('return', _ret.v);

              case 5:
                _context2.next = 11;
                break;

              case 7:
                _context2.prev = 7;
                _context2.t1 = _context2['catch'](0);

                console.error('error in Network.queryStateAll');
                throw _context2.t1;

              case 11:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 7]]);
      }));

      return function queryStateAll(_x) {
        return ref.apply(this, arguments);
      };
    })()
  }, {
    key: 'queryState',
    value: (function () {
      var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(url, progress) {
        var html, info;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return _request2.default.fetch(url);

              case 3:
                html = _context3.sent;

                if (html) {
                  _context3.next = 7;
                  break;
                }

                // when html is null
                if (progress) {
                  progress.emit('update');
                }
                return _context3.abrupt('return', null);

              case 7:
                _context3.next = 9;
                return _lexer2.default.exec(html);

              case 9:
                info = _context3.sent;

                if (info) {
                  _context3.next = 13;
                  break;
                }

                // when error in lexer
                if (progress) {
                  progress.emit('update');
                }
                return _context3.abrupt('return', null);

              case 13:
                info.fetchedAt = new Date().getTime();

                if (progress) {
                  progress.emit('update');
                }
                return _context3.abrupt('return', { url: url, info: info });

              case 18:
                _context3.prev = 18;
                _context3.t0 = _context3['catch'](0);

                console.error('error in Network.queryState');
                console.error(_context3.t0);
                return _context3.abrupt('return', null);

              case 23:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this, [[0, 18]]);
      }));

      return function queryState(_x2, _x3) {
        return ref.apply(this, arguments);
      };
    })()
  }]);

  return Network;
})();

exports.default = Network;