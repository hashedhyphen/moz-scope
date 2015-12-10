import 'babel-polyfill';
import Request  from './request.js';
import Lexer    from './lexer.js';
import Progress from './progress.js';

export default class Network {
  static async queryStateAll(urls) {
    try {
      const progress = new Progress(urls.length);
      progress.start();

      const promises = urls.map((url) => Network.queryState(url, progress));
      const states   = await Promise.all(promises);

      let hash = {};
      states.forEach((state) => {
        if (state) { hash[state.url] = state.info; }
        // exclude null states caused by errors
      });
      return hash;
    } catch (err) {
      console.error(`error in Network.queryStateAll`);
      throw err;
    }
  }

  static async queryState(url, progress) {
    try {
      const html = await Request.fetch(url);
      if (!html) {  // when html is null
        if (progress) { progress.emit(`update`); }
        return null;
      }

      let info = await Lexer.exec(html);
      if (!info) {  // when error in lexer
        if (progress) { progress.emit(`update`); }
        return null;
      }
      info.fetchedAt = new Date().getTime();

      if (progress) { progress.emit(`update`); }
      return { url, info };
    } catch (err) {
      console.error(`error in Network.queryState`);
      console.error(err);
      return null;
    }
  }
}
