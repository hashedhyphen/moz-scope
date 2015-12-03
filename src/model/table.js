import fs from 'fs';

export default class Table {
  static get PATH() {
    return `./test/table.json`;
  }

  static read() {
    return new Promise((resolve, reject) => {
      fs.readFile(Table.PATH, (err, buf) => {
        if (err) {
          console.error(`failed to read table.json`);
          return reject(err);
        }
        resolve(JSON.parse(buf.toString(`utf8`)));
      });
    });
  }

  static update(table) {
    return new Promise((resolve, reject) => {
      const json = JSON.stringify(table, null, 2);
      fs.writeFile(Table.PATH, json, (err) => {
        if (err) {
          console.error(`failed to write table.json`);
          return reject(err);
        }
        resolve(1);
      });
    });
  }

  static diff(updates, table) {
    return [updates, table];
  }
}
