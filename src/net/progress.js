import { EventEmitter } from 'events';

export default class Progress extends EventEmitter {
  constructor(num_url) {
    super();
    this.done = 0;
    this.num_url = num_url;
    this.position = 0;
  }

  start() {
    this.intervalID = setInterval(() => {
      this.log();
      this.position = (this.position + 1) % 3;
    }, 250);

    this.on(`update`, () => {
      this.done++;
      this.log();
      if (this.done === this.num_url) { this.clear(); }
    });
  }

  clear() {
    clearInterval(this.intervalID);
    this.removeAllListeners(`update`);
    process.stdout.write(`\n\n`);
  }

  log() {
    process.stdout.write(
      `${arrow.get(this.position)} Done: ${this.done}/${this.num_url}`
    );
  }
}

const arrow = new Map([
  [0, `\r-  `], [1, `\r-- `], [2, `\r-->`]
]);
