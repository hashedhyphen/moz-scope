import 'babel-polyfill';
import Request from './request.js';
import Lexer   from './lexer.js';

export default class Controller {
  static queryLatestInfo(config) {
    return new Promise(async (resolve, reject) => {
      try {
        const entries = await Promise.all(getPromisesFromConfig(config));
        const hash    = await createHash(entries);
        resolve(hash);
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
function getPromisesFromConfig(config) {
  const urls = Object.keys(config);

  return urls.map((url) => {
    return new Promise(async (resolve) => {
      try {
        const html = await Request.fetch(url);
        if (!html) { return resolve(null); }  // when html is null

        let info = await Lexer.exec(html);
        if (!info) { return resolve(null); }  // failed to lex

        info.fetchedAt = new Date();
        resolve({ url, info });
      } catch (err) {
        console.error(err);
        console.error(`captured in configToPromises`);
        resolve(null);  // ECONNREFUSED etc...
      }
    });
  });
}

// process with O(n)
function createHash(entries) {
  return new Promise((resolve) => {
    let hash = {};
    entries.forEach((entry) => hash[entry.url] = entry.info);
    resolve(hash);
  });
}
