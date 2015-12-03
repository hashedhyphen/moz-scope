import 'babel-polyfill';
import Config  from './model/config.js';
import Table   from './model/table.js';
import Network from './net/network.js';

export default class MozScope {
  static get VERSION() {
    return `0.0.0`;
  }

  static showVersion() {
    console.log(MozScope.VERSION);
  }

  static async showUpdates() {
    try {
      const config = await Config.read();
      const urls   = Object.keys(config);

      const [states, table] = await Promise.all([
        Network.queryStateAll(urls), Table.read()
      ]);

      const [updates, new_table] = await Table.diff(states, table);

      logUpdates(updates);
      Table.update(new_table);
    } catch (err) { console.error(err); }
  }
}

function logUpdates(updates) {
  if (Object.keys(updates).length === 0) {
    return console.log(`All articles is up-to-date :)`);
  }

  console.log(`New post!\n`);
  for (const url in updates) {
    console.log(`URL: ${url}`);
    console.log(`Date: ${new Date(updates[url].writtenAt)}`);
    console.log(`Author: ${updates[url].author}`);
    console.log(`Comment: ${updates[url].comment}\n`);
  }
}
