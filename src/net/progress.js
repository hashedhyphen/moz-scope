import { EventEmitter } from 'events';

export default class Progress extends EventEmitter {
  constructor(num_url) {
    super();
    this.num_url = num_url;
    this.current = 0;

    this.on(`update`, () => {
      process.stdout.write(`Done: ${this.current}/${this.num_url}`);

      if (this.current < this.num_url) {
        process.stdout.write(`\r`);
      } else {
        process.stdout.write(`\n\n`);
      }

      this.current++;
    });
  }
}
