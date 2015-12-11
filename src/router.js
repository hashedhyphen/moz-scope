#!/usr/bin/env node

import MozScope from './mozscope.js';

(() => {
  switch (process.argv[2]) {
    case `-h`:
    case `--help`:
      return MozScope.showHelp();
    case `-r`:
    case `--reset`:
      return MozScope.resetTable();
    case `-v`:
    case `--version`:
      return MozScope.showVersion();
    default:
      return MozScope.showUpdates();
  }
})();
