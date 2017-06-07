'use strict';

const moment = require('moment');
const chalk = require('chalk');

function log(msg, opts={}) {
  let time = moment().format('YYYY-MM-DD HH:mm:ss');

  let formatted_msg = `[${time}] ${msg}`;

  (opts.error ? console.error : console.log)(formatted_msg);
}


module.exports = {
  success(msg) {
    let prefix = chalk.supportsColor ? '' : '[OK] ';
    log(prefix + chalk.green(msg));
  },

  info(msg) {
    let prefix = chalk.supportsColor ? '' : '[INFO] ';
    log(prefix + chalk.cyan(msg));
  },

  warning(msg) {
    let prefix = chalk.supportsColor ? '' : '[WARN] ';
    log(prefix + chalk.yellow(msg));
  },

  error(msg) {
    let prefix = chalk.supportsColor ? '' : '[ERROR] ';
    log(prefix + chalk.red(msg), { error: true });
  },

  fatal(msg) {
    let prefix = chalk.supportsColor ? '' : '[FATAL] ';
    log(prefix + chalk.bgRed.white(msg), { error: true });
  },

  bold(msg) {
    return chalk.bold(msg);
  },
};
