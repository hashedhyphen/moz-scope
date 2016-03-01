'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _events = require('events');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Progress = function (_EventEmitter) {
  _inherits(Progress, _EventEmitter);

  function Progress(num_url) {
    _classCallCheck(this, Progress);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Progress).call(this));

    _this.done = 0;
    _this.num_url = num_url;
    _this.position = 0;
    return _this;
  }

  _createClass(Progress, [{
    key: 'start',
    value: function start() {
      var _this2 = this;

      this.intervalID = setInterval(function () {
        _this2.log();
        _this2.position = (_this2.position + 1) % 3;
      }, 250);

      this.on('update', function () {
        _this2.done++;
        _this2.log();
        if (_this2.done === _this2.num_url) {
          _this2.clear();
        }
      });
    }
  }, {
    key: 'clear',
    value: function clear() {
      clearInterval(this.intervalID);
      this.removeAllListeners('update');
      process.stdout.write('\n\n');
    }
  }, {
    key: 'log',
    value: function log() {
      process.stdout.write(arrow.get(this.position) + ' Done: ' + this.done + '/' + this.num_url);
    }
  }]);

  return Progress;
}(_events.EventEmitter);

exports.default = Progress;


var arrow = new Map([[0, '\r-  '], [1, '\r-- '], [2, '\r-->']]);