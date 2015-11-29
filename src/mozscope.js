import 'babel-polyfill';
import fs from 'fs';
import Converter from './converter.js';

export default class MozScope {
  static get VERSION() {
    return `0.0.0`;
  }

  static showVersion() {
    console.log(MozScope.VERSION);
  }

  static async queryUpdates() {
    try {
      const config  = await readConfig();
      const updates = await Converter.exec(config);
      console.log(updates);
    } catch (err) { console.error(err); }
  }
}

const readConfig = () => {
  const config_path = `./test/config.json`;
  return new Promise((resolve, reject) => {
    fs.readFile(config_path, (err, buf) => {
      if (err) {
        console.error(`Error: failed to read config.json`);
        reject(err);
      } else {
        resolve(JSON.parse(buf.toString(`utf8`)));
      }
    });
  });
};
