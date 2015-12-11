import 'babel-polyfill';
import Config  from './store/config.js';
import Table   from './store/table.js';
import Network from './net/network.js';

export default class MozScope {
  static get VERSION() {
    return `0.3.0`;
  }

  static async resetTable() {
    try {
      await Table.reset();
      console.log(`Reseted articles' table`);
    } catch (err) { console.error(err); }
  }

  static async showUpdates() {
    try {
      const urls = await Config.read();

      const [states, table] = await Promise.all([
        Network.queryStateAll(urls), Table.read()
      ]);

      const [updates, new_table] = await Table.diff(states, table);

      logUpdates(updates);
      Table.update(new_table);
    } catch (err) { console.error(err); }
  }

  static showVersion() {
    console.log(MozScope.VERSION);
  }
}

function logUpdates(updates) {
  if (Object.keys(updates).length === 0) {
    return console.log(`All articles are up-to-date :)`);
  }

  console.log(`New post!\n`);
  for (const url in updates) {
    console.log(`Title: ${updates[url].title}`);
    console.log(`Date: ${new Date(updates[url].writtenAt)}`);
    console.log(`Author: ${updates[url].author}`);
    console.log(`Comment: ${updates[url].comment}\n`);
  }
}
