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

  static updateTable(latests) {
    const table_path = `./test/table.json`
        , json = JSON.stringify(latests, null, `  `);

    return new Promise((resolve, reject) => {
      fs.writeFile(table_path, json, (err) => {
        if (err) { return reject(err); }

        return 1;
      });
    });
  }
}
