import type { LogLevel, StorageLoggerEvent, StorageLoggerPayload } from './types';
/**
 * Default logger instance.
 */
declare const defaultLogger: {
    (level: LogLevel, payload: StorageLoggerPayload): any;
    (payload: StorageLoggerPayload): any;
    /**
     * The current enabled log level.
     */
    level: Omit<"error" | "log" | "fatal" | "warn" | "info" | "debug", "log">;
    /**
     * The active namespace.
     */
    namespace: string;
    /**
     * An array of logger namespaces.
     */
    namespaces: string[];
    /**
     * Logs a payload by default level.
     *
     * @param payload the payload to be logged.
     */
    log(payload: StorageLoggerPayload): any;
    /**
     * Logs a payload by fatal log level.
     *
     * @param payload the payload to be logged.
     */
    fatal(payload: StorageLoggerPayload): any;
    /**
     * Logs a payload by error log level.
     *
     * @param payload the payload to be logged.
     */
    error(payload: StorageLoggerPayload): any;
    /**
     * Logs a payload by warn log level.
     *
     * @param payload the payload to be logged.
     */
    warn(payload: StorageLoggerPayload): any;
    /**
     * Logs a payload by info log level.
     *
     * @param payload the payload to be logged.
     */
    info(payload: StorageLoggerPayload): any;
    /**
     * Logs a payload by debug log level.
     *
     * @param payload the payload to be logged.
     */
    debug(payload: StorageLoggerPayload): any;
    /**
     * Creates a child logger instance.
     *
     * @example
     * import defLogger from './path/to/logger'
     * const logger = defLogger.child('your.namespace');
     *
     * @param ns the namspace of the child to create.
     */
    child(ns: string): any;
    /**
     * Returns rows for the active namespace.
     *
     * @param limit value used to limit returned rows.
     */
    rows(limit?: number): StorageLoggerEvent<"$uid", Record<string, any>>[];
    /**
     * Gets the size of the namespace by row count.
     */
    size(): number;
    /**
     * Clears the current namespace.
     */
    clear(): void;
    /**
     * Clears all namespaces.
     */
    clearAll(): void;
    /**
     * Purges lines from the logger.
     *
     * @param lines the number of lines to purge.
     */
    purge(lines?: number): void;
};
export default defaultLogger;
//# sourceMappingURL=logger.d.ts.map