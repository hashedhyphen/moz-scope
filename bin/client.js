'use strict';

require('babel-polyfill');

var _request = require('./request.js');

var _request2 = _interopRequireDefault(_request);

var _lexer = require('./lexer.js');

var _lexer2 = _interopRequireDefault(_lexer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } step("next"); }); }; }

var origin = 'https://developer.mozilla.org',
    path = '/ja/docs/Web/API/FileReader';

_asyncToGenerator(regeneratorRuntime.mark(function _callee() {
  var body, article;
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return _request2.default.fetch('' + origin + path);

        case 3:
          body = _context.sent;
          _context.next = 6;
          return _lexer2.default.exec(body);

        case 6:
          article = _context.sent;

          console.log(article);
          _context.next = 13;
          break;

        case 10:
          _context.prev = 10;
          _context.t0 = _context['catch'](0);
          console.error(_context.t0);
        case 13:
        case 'end':
          return _context.stop();
      }
    }
  }, _callee, undefined, [[0, 10]]);
}))();