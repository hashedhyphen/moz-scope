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

      console.log(updates);
      Table.update(new_table);
    } catch (err) { console.error(err); }
  }
}
