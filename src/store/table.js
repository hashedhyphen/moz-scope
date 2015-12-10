import fs from 'fs';

export default class Table {
  static get PATH() {
    return `./table.json`;
  }

  static read() {
    return new Promise((resolve, reject) => {
      fs.readFile(Table.PATH, (err, buf) => {
        if (err) {
          if (err.code === `ENOENT`) {
            return resolve(null);  // create new table
          }
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

  static async diff(states, table) {
    try {
      if (!table) { return [states, states]; }  // create new table

      let updates = {};
      for (const url in states) {
        if (!table[url] ||
            states[url].writtenAt > table[url].writtenAt) {
          updates[url] = states[url];
          table[url]   = states[url];
        }
      }
      return [updates, table];
    } catch (err) {
      console.error(`error in Table.diff`);
      console.error(err);
    }
  }
}
