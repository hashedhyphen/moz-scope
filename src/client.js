import 'babel-polyfill';
import Request from './request.js';
import Lexer   from './lexer.js';

const origin = `https://developer.mozilla.org`
    , path   = `/ja/docs/Web/API/FileReader`;

(async () => { // eslint-disable-line
  try {
    let body = await Request.fetch(`${origin}${path}`);
    let article = await Lexer.exec(body);
    console.log(article);
  } catch (err) { console.error(err); }
})();
