'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
    value: function diff(updates, table) {
      return [updates, table];
    }
  }, {
    key: 'PATH',
    get: function get() {
      return './test/table.json';
    }
  }]);

  return Table;
})();

exports.default = Table;