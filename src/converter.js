import 'babel-polyfill';
import Request from './request.js';
import Lexer   from './lexer.js';

export default class Converter {
  static async exec(config) {
    return new Promise(async (resolve, reject) => {
      try {
        const updates = await Promise.all(Object.keys(config).map((url) => {
          return new Promise(async (resolve, reject) => {
            try {
              const body = await Request.fetch(url);
              resolve(Lexer.exec(body));
            } catch (err) { reject(err); }
          });
        }));
        resolve(updates);
      } catch (err) {
        console.error(`converter.js`);
        reject(err);
      }
    });
  }
}
