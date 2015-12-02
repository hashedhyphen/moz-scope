import 'babel-polyfill';
import fs from 'fs';

export default class File {
  static readConfig() {
    const config_path = `./test/config.json`;

    return new Promise((resolve, reject) => {
      fs.readFile(config_path, (err, buf) => {
        if (err) {
          console.error(`failed to read config.json`);
          reject(err);
        } else {
          resolve(JSON.parse(buf.toString(`utf8`)));
        }
      });
    });
  }
}
