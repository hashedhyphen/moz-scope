import 'babel-polyfill';
import fs from 'fs';

export default class MozScope {
  static get VERSION() {
    return `0.0.0`;
  }

  static showVersion() {
    console.log(MozScope.VERSION);
  }

  static async queryUpdates() {
    try {
      let config = await readConfig();
      console.log(config);
    } catch (e) { console.error(e); }
  }
}

let readConfig= () => {
  let config_path = `./test/config.json`;
  return new Promise((resolve, reject) => {
    fs.readFile(config_path, (err, buf) => {
      if (err) {
        console.error(`Error: failed to read config.json`);
        reject(err);
      } else {
        resolve(JSON.parse(buf.toString(`ascii`)));
      }
    });
  });
};
