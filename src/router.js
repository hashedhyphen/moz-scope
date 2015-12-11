#!/usr/bin/env node

import MozScope from './mozscope.js';

switch (process.argv[2]) {
  case `-r`:
  case `--reset`:
    MozScope.resetTable();
    break;
  case `-v`:
  case `--version`:
    MozScope.showVersion();
    break;
  default:
    MozScope.showUpdates();
}
