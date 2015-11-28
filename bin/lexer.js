'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

require('babel-polyfill');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { var callNext = step.bind(null, "next"); var callThrow = step.bind(null, "throw"); function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(callNext, callThrow); } } callNext(); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* eslint-disable arrow-parens */

var Lexer = (function () {
  function Lexer() {
    _classCallCheck(this, Lexer);
  }

  _createClass(Lexer, null, [{
    key: 'exec',
    value: function exec(body) {
      return new Promise((function () {
        var _this = this;

        var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(resolve, reject) {
          var revision;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.prev = 0;
                  _context.next = 3;
                  return Lexer.extractLatestRevision(body);

                case 3:
                  revision = _context.sent;

                  resolve(list);
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

        return function (_x, _x2) {
          return ref.apply(this, arguments);
        };
      })());
    }
  }, {
    key: 'extractLatestRevision',
    value: function extractLatestRevision(html) {
      return new Promise((function () {
        var _this2 = this;

        var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(resolve, reject) {
          var ul_regex, li_regex, ul, list;
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  ul_regex = /<ul class="revision-list">[\s\S]+?<\/ul>/;
                  li_regex = /<li>[\s\S]+?<\/li>/;
                  _context2.next = 4;
                  return ul_regex.exec(html)[0];

                case 4:
                  ul = _context2.sent;
                  _context2.next = 7;
                  return li_regex.exec(ul)[0];

                case 7:
                  list = _context2.sent;

                  list ? resolve(list) : reject('missing revision-list');

                case 9:
                case 'end':
                  return _context2.stop();
              }
            }
          }, _callee2, _this2);
        }));

        return function (_x3, _x4) {
          return ref.apply(this, arguments);
        };
      })());
    }
  }]);

  return Lexer;
})();

exports.default = Lexer;