'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

require('babel-polyfill');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Lexer = (function () {
  function Lexer() {
    _classCallCheck(this, Lexer);
  }

  _createClass(Lexer, null, [{
    key: 'exec',
    value: function exec(html) {
      return new Promise(function (resolve, reject) {
        try {
          var revision = extractLatestRevision(html),
              date = extractDate(revision),
              author = extractAuthor(revision),
              comment = extractComment(revision);

          resolve({ date: date, author: author, comment: comment });
        } catch (err) {
          resolve(null);
        } // for fault tolerance
      });
    }
  }]);

  return Lexer;
})();

exports.default = Lexer;

function extractLatestRevision(html) {
  try {
    var ul_regex = /<ul class="revision-list">[\s\S]+?<\/ul>/,
        li_regex = /<li>[\s\S]+?<\/li>/,
        ul = ul_regex.exec(html)[0],
        list = li_regex.exec(ul)[0];

    return list;
  } catch (err) {
    console.error('error on revision-list');
    throw err;
  }
}

function extractDate(revision) {
  try {
    var date_regex = /<time[\s\S]+?>([\s\S]+?)<\/time>/,
        date = date_regex.exec(revision)[1];

    return new Date(date);
  } catch (err) {
    console.error('error on date');
    throw err;
  }
}

function extractAuthor(revision) {
  try {
    var div_regex = /<div[\s\S]+?creator">([\s\S]+?)<\/div>/,
        author_regex = /<a[\s\S]+?>([\s\S]+?)<\/a>/,
        anchor = div_regex.exec(revision)[1],
        author = author_regex.exec(anchor)[1];

    return author;
  } catch (err) {
    console.error('error on author');
    throw err;
  }
}

function extractComment(revision) {
  try {
    var comment_regex = /<div[\s\S]+?comment">([\s\S]*?)<\/div>/,
        comment = comment_regex.exec(revision)[1];

    return comment.trim();
  } catch (err) {
    console.error('error on comment');
    throw err;
  }
}