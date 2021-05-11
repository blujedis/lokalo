import { getTimestamp, serializeError } from './utils';
import { DEFAULTS } from './constants';
import { LOG_LEVELS } from './constants';
import type {
  ILokaloEvent,
  ILokaloOptions, LogLevel,
  LogLevelInternal,
  ILokaloPayload
} from './types';
import { LokaloStore } from './store';

export class LokaloLogger extends LokaloStore {

  options: Required<ILokaloOptions>;

  constructor(options: ILokaloOptions, public parent?: LokaloLogger) {
    super({ ...DEFAULTS as any, ...options });
    this.options = { ...DEFAULTS as any, ...options };
    this.checkMaxLines();
  }

  private _logger(level: LogLevel | ILokaloPayload, payload?: ILokaloPayload) {

    // We don't want to log empty lines in local storage.
    if (typeof level === 'undefined')
      return this;

    if (!payload) {
      payload = level;
      level = '';
    }

    level = level || 'log';

    if (!this.isActiveLevel(this.level as LogLevelInternal))
      return this;

    if (typeof payload === 'string')
      payload = { message: payload };

    else if (payload instanceof Error)
      payload = serializeError(payload);

    this.checkMaxLines();

    const _payload = payload as ILokaloEvent;
    _payload.id = this.options.uid();
    _payload.namespace = this.namespace;
    _payload.timestamp = getTimestamp();
    _payload.message = _payload.message || '';
    _payload.level = level as LogLevelInternal;

    // Add to the queue.
    this.queuePayload(_payload);

    return this;

  }

  get level() {
    return this.options.level;
  }

  /**
   * Checks if a level is active.
   * 
   * @param level the level to inspect as active.
   */
  isActiveLevel(level: LogLevelInternal) {
    if (level === 'log')
      return true;
    const curIndex = LOG_LEVELS.indexOf(level);
    const loggerIndex = LOG_LEVELS.indexOf(this.level as LogLevelInternal);
    return curIndex <= loggerIndex;
  }

  /**
    * Logs a payload by default level.
    * 
    * @param payload the payload to be logged.
    */
  log(payload: ILokaloPayload) { return this._logger('log', payload); }

  /**
   * Logs a payload by fatal log level.
   * 
   * @param payload the payload to be logged.
   */
  fatal(payload: ILokaloPayload) { this._logger('fatal', payload); }

  /**
   * Logs a payload by error log level.
   * 
   * @param payload the payload to be logged.
   */
  error(payload: ILokaloPayload) { this._logger('error', payload) }

  /**
   * Logs a payload by warn log level.
   * 
   * @param payload the payload to be logged.
   */
  warn(payload: ILokaloPayload) { this._logger('warn', payload); }

  /**
   * Logs a payload by info log level.
   * 
   * @param payload the payload to be logged.
   */
  info(payload: ILokaloPayload) { this._logger('info', payload); }

  /**
   * Logs a payload by debug log level.
   * 
   * @param payload the payload to be logged.
   */
  debug(payload: ILokaloPayload) { this._logger('debug', payload); }

  /**
   * Creates a child logger instance.
   * 
   * @example
   * import defLogger from './path/to/logger'
   * const logger = defLogger.child('your.namespace');
   * 
   * @param namespace the namspace of the child to create.
   */
  child(namespace: string) {
    return new LokaloLogger({ ...this.options, parent: this.namespace, namespace }, this);
  }

}

