import type { ILokaloOptions } from './types';

export const LOG_LEVELS = <const>['log', 'fatal', 'error', 'warn', 'info', 'debug'];

export const STYLES = {
  inherit: 'color: inherit',
  dim: 'color: #666',
  log: 'color: lightslategray',
  fatal: 'color: red',
  error: 'color: firebrick',
  warn: 'color: gold',
  info: 'color: deepskyblue',
  debug: 'color: magenta'
};

export const DEFAULTS: ILokaloOptions = {
  namespace: 'lokalo',
  parent: '',
  level: 'error',
  uid: () => Date.now(),
  type: 'local' as 'local',
  maxLines: 3,
  displayOutput: true,
  styles: { ...STYLES }
};

