import 'babel-polyfill';
import File       from './file.js';
import Controller from './controller.js';

export default class MozScope {
  static get VERSION() {
    return `0.0.0`;
  }

  static showVersion() {
    console.log(MozScope.VERSION);
  }

  static async showUpdates() {
    try {
      const config  = await File.readConfig();
      const updates = await Controller.queryUpdates(config);
      console.log(updates);

      console.log(`end`);
    } catch (err) { console.error(err); }
  }
}
