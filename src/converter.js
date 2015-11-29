import 'babel-polyfill';
import Request from './request.js';
import Lexer   from './lexer.js';

export default class Converter {
  static async exec(config) {
    return new Promise(async (resolve, reject) => {
      try {
        for (const url of Object.keys(config)) {
          const body = await Request.fetch(url);
          console.log(body);
          console.log(`${url} length: ${body.length}`);
          const info = await Lexer.exec(body);
          console.log(info);
        }
        resolve(200);
      } catch (err) {
        console.error(`converter.js`);
        reject(err);
      }
    });
  }
}
