import 'babel-polyfill';

/* eslint-disable arrow-parens */

export default class Lexer {
  static exec(body) {
    return new Promise(async (resolve, reject) => {
      try {
        const revision = await Lexer.extractLatestRevision(body);
        resolve(list);
      } catch (err) { reject(err); }
    });
  }

  static extractLatestRevision(html) {
    return new Promise(async (resolve, reject) => {
      const ul_regex = /<ul class="revision-list">[\s\S]+?<\/ul>/
          , li_regex = /<li>[\s\S]+?<\/li>/
          , ul   = await ul_regex.exec(html)[0]
          , list = await li_regex.exec(ul)[0];
      (list) ? resolve(list) : reject(`missing revision-list`);
    });
  }
}
