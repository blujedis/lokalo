import type { ILokaloOptions } from './types';
import { uuidv4 } from './utils';

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
  namespace: 'default',
  level: 'error',
  uid: () => uuidv4(),
  type: 'local' as const,
  maxLines: 50,
  displayOutput: true,
  styles: { ...STYLES }
};

