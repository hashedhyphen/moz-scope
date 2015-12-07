'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

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

    _this.done = 0;
    _this.num_url = num_url;
    return _this;
  }

  _createClass(Progress, [{
    key: 'start',
    value: function start() {
      var _this2 = this;

      this.on('update', function () {
        _this2.done++;
        process.stdout.write('Done: ' + _this2.done + '/' + _this2.num_url);

        if (_this2.done < _this2.num_url) {
          process.stdout.write('\r');
        } else {
          process.stdout.write('\n\n');
          _this2.removeAllListeners('update');
        }
      });

      process.stdout.write('Done: 0/' + this.num_url + '\r');
    }
  }]);

  return Progress;
})(_events.EventEmitter);

exports.default = Progress;