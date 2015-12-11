import fs   from 'fs';
import path from 'path';

export default class Table {
  static get PATH() {
    const dir = path.dirname(process.argv[1]);  // moz-scope/bin
    return path.resolve(dir, '../table.json');
  }

  static async diff(states, table) {
    try {
      let updates = {};
      for (let url in states) {
        if (!table[url] ||  // create a new entry or update to the newer
            states[url].writtenAt > table[url].writtenAt) {
          updates[url] = states[url];
          table[url] = {
            writtenAt: states[url].writtenAt,
            fetchedAt: states[url].fetchedAt
          };
        }
      }
      return [updates, table];
    } catch (err) {
      console.error(`error in Table.diff`);
      console.error(err);
    }
  }

  static read() {
    return new Promise((resolve, reject) => {
      fs.readFile(Table.PATH, (err, buf) => {
        if (err) {
          if (err.code === `ENOENT`) {
            return resolve({});  // create new table
          }
          console.error(`failed to read table.json`);
          return reject(err);
        }
        resolve(JSON.parse(buf.toString(`utf8`)));
      });
    });
  }

  static reset() {
    Table.update({});
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
}
