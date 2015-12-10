import fs from 'fs';
import os from 'os';

export default class Config {
  static get PATH() {
    return `${os.homedir()}/mozscope.conf`;
  }

  static read() {
    return new Promise((resolve, reject) => {
      fs.readFile(Config.PATH, (err, buf) => {
        if (err) {
          console.error(`failed to read mozscope.conf`);
          return reject(err);
        }

        const urls = buf.toString(`utf8`).split(os.EOL);
        resolve(urls.filter((entry) => entry.length > 0));
                                    // exclude empty lines
      });
    });
  }
}
