import { formatNamespace, formatter, getTimestamp, serializeError } from './utils';
import { DEFAULTS, LOG_LEVELS } from './constants';
import type { IStorageLoggerOptions, LogLevel, 
  StorageLoggerEvent, StorageLoggerPayload, Style } from './types';

/**
 * Creates a new storage logger instance.
 * 
 * @param options storage logger options. 
 * @param namespaces currently loaded namespaces.
 */
function createStorageLogger<K extends string = '$uid', U extends Record<string, any> = Record<string, any>>(options: IStorageLoggerOptions<K>, namespaces: string[] = []) {

  type Logger = typeof logger;

  options = {
    ...DEFAULTS as any,
    ...options
  };

  const store = options.type === 'local' ? localStorage : sessionStorage;

  const { parent, namespace, maxLines, key, keyValue, userKey, level: initLevel, consoleOutput, styles } = options as Required<IStorageLoggerOptions<K>>;

  const activeNamespace = formatNamespace(namespace, parent);

  let _queue: StorageLoggerEvent<K, U>[] = [];
  let _queueId: any;

  if (!namespaces.includes(activeNamespace))
    namespaces.push(activeNamespace);

  /**
   * Clears the log queue.
   */
  function clearQueue() {
    if (!_queueId) return;
    clearInterval(_queueId);
    _queue = [];
  }

  /**
   * Starts the log queue.
   */
  function startQueue() {
    _queueId = setInterval(() => {
      if (!_queue.length)
        return clearQueue();
      writePayload(activeNamespace, _queue.shift() as StorageLoggerEvent<K, U>);
    }, 150);
  }

  /**
   * Gets namespaced value by key.
   * 
   * @param ns the namespace to get.
   */
  function getKey(ns: string): StorageLoggerEvent<K, U>[] {
    const obj = store.getItem(ns);
    return obj && obj.length ? JSON.parse(obj) : [];
  }

  /**
   * Gets a user from storage.
   * NOTE: always uses localStorage.
   * 
   * @param key the user key for retrieving user object.
   */
  function getUser(key: string) {
    const user = localStorage.getItem(key);
    const item = store.getItem(key);
    if (!user || !item)
      return null;
    return JSON.parse(item);
  }

  /**
   * Sets a namespace's value.
   * 
   * @param ns the names apce to be set.
   * @param data the value to set to the namespace.
   */
  function setKey(ns: string, data: StorageLoggerEvent<K, U> | StorageLoggerEvent<K, U>[]) {
    if (!data) return;
    if (!Array.isArray(data))
      data = [data];
    const str = JSON.stringify(data);
    store.setItem(ns, str);
  }

  function removeKey(ns: string) {
    store.removeItem(ns);
  }

  /**
   * Deletes rows for the given namespace.
   * 
   * @param ns the namespace to delete rows for.
   * @param count the number of rows to delete if not 1.
   */
  function deleteRows(ns: string, count = 1) {
    const rows = getKey(ns);
    rows.sort((a, b) => {
      if (a.timestamp > b.timestamp)
        return 1;
      else if (a.timestamp < b.timestamp)
        return -1;
      else
        return 0;
    }).splice(0, count);
    setKey(ns, rows);
  }

  /**
   * Gets the number of rows for a namespace.
   * 
   * @param ns the namespace to get row count for.
   */
  function rowsCount(ns: string) {
    return getKey(ns).length;
  }

  /**
   * Gets the size of a namespace.
   * 
   * @param ns the namespace to get size for.
   */
  function checkSize(ns: string) {
    if (!maxLines) return;
    const count = rowsCount(ns);
    if (count === maxLines) {
      deleteRows(ns);
    }
    else if (count > maxLines) {
      const adj = count - maxLines;
      deleteRows(ns, adj);
    }
  }

  /**
   * Checks if a level is active.
   * 
   * @param level the level to inspect as active.
   */
  function isActiveLevel(level: LogLevel) {
    const curIndex = LOG_LEVELS.indexOf(level);
    const loggerIndex = LOG_LEVELS.indexOf(logger.level as LogLevel);
    return curIndex <= loggerIndex;
  }

  /**
   * Checks if should output to console as well as log to storage.
   */
  function shouldOutput() {
    return (consoleOutput === 'always' || process.env['NODE_ENV'] !== 'production');
  }

  /**
   * Writes the payload to storage by namespace.
   * 
   * @param ns the namespace to be written.
   * @param payload the payload to be written.
   */
  function writePayload(ns: string, payload: StorageLoggerEvent<K, U>) {
    const rows = [...getKey(ns), payload];
    if (shouldOutput()) {
      const tsKey = getTimestamp(payload[key]).split('.').shift()?.split('T').join(' ');
      const trimNs = ns.replace(/^logger\./, '');
      const truncMessage = payload.message.slice(0, 25);
      const groupLabel = formatter(styles)
        .add(payload.level as Style, tsKey)
        .unstyled(trimNs)
        .unstyled('-')
        .add('dim', truncMessage)
        .toString();
      console.groupCollapsed(...groupLabel);
      console.log(payload);
      console.groupEnd();
    }
    setKey(ns, rows);
  }

  /**
    * Logs a payload by log level.
    * 
    * @param level the level being logged.
    * @param payload the value or payload to log.
    */
  function logger(level: LogLevel, payload: StorageLoggerPayload): Logger;

  /**
   * Logs a payload by default level.
   * 
   * @param payload the value or payload to log.
   */
  function logger(payload: StorageLoggerPayload): Logger;

  function logger(level: LogLevel | StorageLoggerPayload, payload?: StorageLoggerPayload) {

    // We don't want to log empty lines in local storage.
    if (typeof level === 'undefined')
      return logger;

    if (!payload) {
      payload = level;
      level = '';
    }

    level = level || 'log';

    if (!isActiveLevel(logger.level as LogLevel))
      return logger;

    if (typeof payload === 'string')
      payload = { message: payload };

    else if (payload instanceof Error)
      payload = serializeError(payload);

    checkSize(activeNamespace);

    const _payload = payload as StorageLoggerEvent<K, U>;
    _payload[key as K] = keyValue() as any;
    _payload.namespace = activeNamespace;
    _payload.timestamp = getTimestamp();
    _payload.message = _payload.message || '';

    if (userKey)
      _payload.user = getUser(userKey);

    // Add to the queue.
    _queue.push(_payload);

    if (!_queueId)
      startQueue();

    return logger;

  }

  /**
   * The current enabled log level.
   */
  logger.level = initLevel as Omit<LogLevel, 'log'>;

  /**
   * The active namespace.
   */
  logger.namespace = activeNamespace;

  /**
   * An array of logger namespaces.
   */
  logger.namespaces = namespaces;

  /**
   * Logs a payload by default level.
   * 
   * @param payload the payload to be logged.
   */
  logger.log = (payload: StorageLoggerPayload) => logger('log', payload);

  /**
   * Logs a payload by fatal log level.
   * 
   * @param payload the payload to be logged.
   */
  logger.fatal = (payload: StorageLoggerPayload) => logger('fatal', payload);

  /**
   * Logs a payload by error log level.
   * 
   * @param payload the payload to be logged.
   */
  logger.error = (payload: StorageLoggerPayload) => logger('error', payload);

  /**
   * Logs a payload by warn log level.
   * 
   * @param payload the payload to be logged.
   */
  logger.warn = (payload: StorageLoggerPayload) => logger('warn', payload);

  /**
   * Logs a payload by info log level.
   * 
   * @param payload the payload to be logged.
   */
  logger.info = (payload: StorageLoggerPayload) => logger('info', payload);

  /**
   * Logs a payload by debug log level.
   * 
   * @param payload the payload to be logged.
   */
  logger.debug = (payload: StorageLoggerPayload) => logger('debug', payload);

  /**
   * Creates a child logger instance.
   * 
   * @example
   * import defLogger from './path/to/logger'
   * const logger = defLogger.child('your.namespace');
   * 
   * @param ns the namspace of the child to create.
   */
  logger.child = (ns: string) => {
    const nextParent = /global$/.test(activeNamespace) ? 'logger' : activeNamespace;
    return createStorageLogger<K>({ ...options, parent: nextParent, namespace: ns }, namespaces);
  };

  /**
   * Returns rows for the active namespace.
   * 
   * @param limit value used to limit returned rows.
   */
  logger.rows = (limit = 0) => {
    let rows = getKey(activeNamespace).reverse();
    if (limit)
      rows = rows.slice(0, limit);
    return rows;
  };

  /**
   * Gets the size of the namespace by row count.
   */
  logger.size = () => rowsCount(activeNamespace);

  /**
   * Clears the current namespace.
   */
  logger.clear = () => {
    removeKey(activeNamespace);
  };

  /**
   * Clears all namespaces.
   */
  logger.clearAll = () => namespaces.forEach(ns => removeKey(ns));

  /**
   * Purges lines from the logger.
   * 
   * @param lines the number of lines to purge.
   */
  logger.purge = (lines = 1) => {
    deleteRows(activeNamespace, lines);
  };

  return logger;

}

/**
 * Default logger instance.
 */
const defaultLogger = createStorageLogger({ parent: 'logger', namespace: 'global' });

export default defaultLogger;