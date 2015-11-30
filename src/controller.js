import 'babel-polyfill';
import Request from './request.js';
import Lexer   from './lexer.js';

export default class Controller {
  static async queryUpdates(config) {
    return new Promise((resolve, reject) => {
      try {
        const updates = Promise.all(configToPromises(config));
        resolve(updates);
      } catch (err) {
        console.error(`error in converter.js`);
        reject(err);
      }
    });
  }
}

function configToPromises(config) {
  const urls = Object.keys(config);

  return urls.map(async (url) => {
    const html = await Request.fetch(url);
    return Lexer.exec(html);  // Promise
  });
}
