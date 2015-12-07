import { EventEmitter } from 'events';

export default class Progress extends EventEmitter {
  constructor(num_url) {
    super();
    this.done = 0;
    this.num_url = num_url;
  }

  start() {
    this.on(`update`, () => {
      this.done++;
      process.stdout.write(`Done: ${this.done}/${this.num_url}`);

      if (this.done < this.num_url) {
        process.stdout.write(`\r`);
      } else {
        process.stdout.write(`\n\n`);
        this.removeAllListeners(`update`);
      }
    });

    process.stdout.write(`Done: 0/${this.num_url}\r`);
  }
}
