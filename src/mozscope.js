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
      const latests = await Controller.queryLatestInfo(config);
      File.updateTable(latests);
      console.log(latests);
    } catch (err) { console.error(err); }
  }
}
