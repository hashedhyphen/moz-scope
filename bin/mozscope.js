'use strict';

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

require('babel-polyfill');

var _generateHelp = require('generate-help');

var _generateHelp2 = _interopRequireDefault(_generateHelp);

var _config = require('./store/config.js');

var _config2 = _interopRequireDefault(_config);

var _network = require('./net/network.js');

var _network2 = _interopRequireDefault(_network);

var _table = require('./store/table.js');

var _table2 = _interopRequireDefault(_table);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MozScope = (function () {
  function MozScope() {
    _classCallCheck(this, MozScope);
  }

  _createClass(MozScope, null, [{
    key: 'resetTable',
    value: (function () {
      var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return _table2.default.reset();

              case 3:
                console.log('Reseted articles\' table');
                _context.next = 9;
                break;

              case 6:
                _context.prev = 6;
                _context.t0 = _context['catch'](0);
                console.error(_context.t0);
              case 9:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 6]]);
      }));

      return function resetTable() {
        return ref.apply(this, arguments);
      };
    })()
  }, {
    key: 'showHelp',
    value: function showHelp() {
      console.log((0, _generateHelp2.default)({
        usage: 'moz-scope [options]',
        options: {
          help: {
            alias: 'h',
            desc: 'output usage information'
          },
          reset: {
            alias: 'r',
            desc: 'reset internal storage (not mozscope.conf)'
          },
          version: {
            alias: 'v',
            desc: 'output the version number'
          }
        }
      }));
    }
  }, {
    key: 'showUpdates',
    value: (function () {
      var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee2() {
        var urls, _ref, _ref2, states, table, _ref3, _ref4, updates, new_table;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return _config2.default.read();

              case 3:
                urls = _context2.sent;
                _context2.next = 6;
                return Promise.all([_network2.default.queryStateAll(urls), _table2.default.read()]);

              case 6:
                _ref = _context2.sent;
                _ref2 = _slicedToArray(_ref, 2);
                states = _ref2[0];
                table = _ref2[1];
                _context2.next = 12;
                return _table2.default.diff(states, table);

              case 12:
                _ref3 = _context2.sent;
                _ref4 = _slicedToArray(_ref3, 2);
                updates = _ref4[0];
                new_table = _ref4[1];

                logUpdates(updates);
                _table2.default.update(new_table);
                _context2.next = 23;
                break;

              case 20:
                _context2.prev = 20;
                _context2.t0 = _context2['catch'](0);
                console.error(_context2.t0);
              case 23:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 20]]);
      }));

      return function showUpdates() {
        return ref.apply(this, arguments);
      };
    })()
  }, {
    key: 'showVersion',
    value: function showVersion() {
      console.log(MozScope.VERSION);
    }
  }, {
    key: 'VERSION',
    get: function get() {
      return '0.4.0';
    }
  }]);

  return MozScope;
})();

exports.default = MozScope;

function logUpdates(updates) {
  if (Object.keys(updates).length === 0) {
    return console.log('All articles are up-to-date :)');
  }

  console.log('New post!\n');
  for (var url in updates) {
    console.log('Title: ' + updates[url].title);
    console.log('Date: ' + new Date(updates[url].writtenAt));
    console.log('Author: ' + updates[url].author);
    console.log('Comment: ' + updates[url].comment + '\n');
  }
}