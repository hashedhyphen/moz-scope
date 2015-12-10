'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Table = (function () {
  function Table() {
    _classCallCheck(this, Table);
  }

  _createClass(Table, null, [{
    key: 'read',
    value: function read() {
      return new Promise(function (resolve, reject) {
        _fs2.default.readFile(Table.PATH, function (err, buf) {
          if (err) {
            if (err.code === 'ENOENT') {
              return resolve(null); // create new table
            }
            console.error('failed to read table.json');
            return reject(err);
          }
          resolve(JSON.parse(buf.toString('utf8')));
        });
      });
    }
  }, {
    key: 'update',
    value: function update(table) {
      return new Promise(function (resolve, reject) {
        var json = JSON.stringify(table, null, 2);
        _fs2.default.writeFile(Table.PATH, json, function (err) {
          if (err) {
            console.error('failed to write table.json');
            return reject(err);
          }
          resolve(1);
        });
      });
    }
  }, {
    key: 'diff',
    value: (function () {
      var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(states, table) {
        var updates, url;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;

                if (table) {
                  _context.next = 3;
                  break;
                }

                return _context.abrupt('return', [states, states]);

              case 3:
                // create new table

                updates = {};

                for (url in states) {
                  if (!table[url] || // create new table or...
                  states[url].writtenAt > table[url].writtenAt) {
                    // got the new
                    updates[url] = states[url];
                    table[url] = states[url];
                  }
                }
                return _context.abrupt('return', [updates, table]);

              case 8:
                _context.prev = 8;
                _context.t0 = _context['catch'](0);

                console.error('error in Table.diff');
                console.error(_context.t0);

              case 12:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 8]]);
      }));

      return function diff(_x, _x2) {
        return ref.apply(this, arguments);
      };
    })()
  }, {
    key: 'PATH',
    get: function get() {
      var dir = _path2.default.dirname(process.argv[1]); // moz-scope/bin
      return _path2.default.resolve(dir, '../table.json');
    }
  }]);

  return Table;
})();

exports.default = Table;