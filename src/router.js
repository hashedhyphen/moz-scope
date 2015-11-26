import MozScope from './mozscope.js';

switch (process.argv[2]) {
  case `-v`:
  case `--version`:
    MozScope.showVersion();
    break;
  default:
    MozScope.queryUpdates();
}
