import type { IStorageLoggerOptions, LogLevel } from './types';

export const ENV_LOG_LEVEL = typeof process !== 'undefined' ? process.env['REACT_APP_LOG_LEVEL'] : 'error';

export const LOG_LEVELS = <const>['log', 'fatal', 'error', 'warn', 'info', 'debug'];

export const STYLES = {
  inherit: 'color: inherit',
  dim: 'color: #666',
  log: 'color: lightslategray',
  fatal: 'color: gold; background-color: firebrick',
  error: 'color: firebrick',
  warn: 'color: gold',
  info: 'color: deepskyblue',
  debug: 'color: magenta'
};

export const DEFAULTS = {
  type: 'local' as 'local',
  maxLines: 10,
  key: '$uid' as IStorageLoggerOptions['key'],
  keyValue: () => Date.now(),
  userKey: 'user',
  level: ENV_LOG_LEVEL as LogLevel,
  consoleOutput: 'development' as IStorageLoggerOptions['consoleOutput'],
  styles: { ...STYLES }
};

