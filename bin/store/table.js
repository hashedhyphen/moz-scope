'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Table = function () {
  function Table() {
    _classCallCheck(this, Table);
  }

  _createClass(Table, null, [{
    key: 'diff',
    value: function () {
      var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(states, table) {
        var updates, url;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                updates = {};

                for (url in states) {
                  if (!table[url] || // create a new entry or update to the newer
                  states[url].writtenAt > table[url].writtenAt) {
                    updates[url] = states[url];
                    table[url] = {
                      writtenAt: states[url].writtenAt,
                      fetchedAt: states[url].fetchedAt
                    };
                  }
                }
                return _context.abrupt('return', [updates, table]);

              case 6:
                _context.prev = 6;
                _context.t0 = _context['catch'](0);

                console.error('error in Table.diff');
                console.error(_context.t0);

              case 10:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 6]]);
      }));

      return function diff(_x, _x2) {
        return ref.apply(this, arguments);
      };
    }()
  }, {
    key: 'read',
    value: function read() {
      return new Promise(function (resolve, reject) {
        _fs2.default.readFile(Table.PATH, function (err, buf) {
          if (err) {
            if (err.code === 'ENOENT') {
              return resolve({}); // create new table
            }
            console.error('failed to read table.json');
            return reject(err);
          }
          resolve(JSON.parse(buf.toString('utf8')));
        });
      });
    }
  }, {
    key: 'reset',
    value: function reset() {
      Table.update({});
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
    key: 'PATH',
    get: function get() {
      var dir = _path2.default.dirname(process.argv[1]); // moz-scope/bin
      return _path2.default.resolve(dir, '../table.json');
    }
  }]);

  return Table;
}();

exports.default = Table;