import fs from 'fs';

export default class Config {
  static get PATH() {
    return `./test/config.json`;
  }

  static read() {
    return new Promise((resolve, reject) => {
      fs.readFile(Config.PATH, (err, buf) => {
        if (err) {
          console.error(`failed to read config.json`);
          return reject(err);
        }
        resolve(JSON.parse(buf.toString(`utf8`)));
      });
    });
  }
}
