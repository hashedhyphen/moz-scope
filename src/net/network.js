import 'babel-polyfill';
import Request from './request.js';
import Lexer   from './lexer.js';

export default class Network {
  static async queryStateAll(urls) {
    try {
      const promises = urls.map((url) => Network.queryState(url));
      const states   = await Promise.all(promises);

      let hash = {};
      states.forEach((state) => hash[state.url] = state.info);
      return hash;
    } catch (err) {
      console.error(`error in Network.queryStateAll`);
      throw err;
    }
  }

  static async queryState(url) {
    try {
      const html = await Request.fetch(url);
      if (!html) { return null; }  // when html is null

      let info = await Lexer.exec(html);
      if (!info) { return null; }  // when error in lexer

      info.fetchedAt = new Date();
      return { url, info };
    } catch (err) {
      console.error(`error in network.js`);
      console.error(err);
      return null;
    }
  }
}
