'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = require('events');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Progress = (function (_EventEmitter) {
  _inherits(Progress, _EventEmitter);

  function Progress(num_url) {
    _classCallCheck(this, Progress);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Progress).call(this));

    _this.num_url = num_url;
    _this.current = 0;

    _this.on('update', function () {
      process.stdout.write('Done: ' + _this.current + '/' + _this.num_url);

      if (_this.current < _this.num_url) {
        process.stdout.write('\r');
      } else {
        process.stdout.write('\n\n');
      }

      _this.current++;
    });
    return _this;
  }

  return Progress;
})(_events.EventEmitter);

exports.default = Progress;