import 'babel-polyfill';
import Request from './request.js';
import Lexer   from './lexer.js';

export default class Controller {
  static queryUpdates(config) {
    return new Promise(async (resolve, reject) => {
      try {
        const updates = await Promise.all(configToPromises(config));
        resolve(updates);
      } catch (err) {
        console.error(`error in controller.js`);
        reject(err);
      }
    });
  }
}


// Fault-tolerant design
// If a resource is fetched and lexed succeessfully,
// latest info is pushed, otherwise null.
function configToPromises(config) {
  const urls = Object.keys(config);

  return urls.map((url) => {
    return new Promise(async (resolve) => {
      try {
        const html = await Request.fetch(url);
        if (html) { resolve(Lexer.exec(html)); }
        else      { resolve(null); }  // when html is null
      } catch (err) {
        console.error(err);
        console.error(`captured in configToPromises`);
        resolve(null);  // ECONNREFUSED etc...
      }
    });
  });
}
