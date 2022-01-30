import type { ILokaloOptions, LogLevel, LogLevelInternal, ILokaloPayload } from './types';
import { LokaloStore } from './store';
import type { LokaloOptions } from '.';
export declare class LokaloLogger extends LokaloStore {
    parent?: LokaloLogger | undefined;
    options: Required<ILokaloOptions>;
    constructor(options: ILokaloOptions, parent?: LokaloLogger | undefined);
    private _logger;
    get level(): LogLevel;
    /**
     * Sets a value for options.
     *
     * @param key the option key to be updated.
     * @param value the key's value to be set.
     */
    setOption<K extends keyof LokaloOptions>(key: K, value?: LokaloOptions[K]): void;
    /**
     * Merges object of options with provided.
     * To override options use: Lokalo.options = { new object }.
     * @param options an options object to be merged with current.
     */
    setOption(options: LokaloOptions): void;
    /**
     * Checks if a level is active.
     *
     * @param level the level to inspect as active.
     */
    isActiveLevel(level: LogLevelInternal): boolean;
    /**
      * Logs a payload by default level.
      *
      * @param payload the payload to be logged.
      */
    log(payload: ILokaloPayload): this;
    /**
     * Logs a payload by fatal log level.
     *
     * @param payload the payload to be logged.
     */
    fatal(payload: ILokaloPayload): void;
    /**
     * Logs a payload by error log level.
     *
     * @param payload the payload to be logged.
     */
    error(payload: ILokaloPayload): void;
    /**
     * Logs a payload by warn log level.
     *
     * @param payload the payload to be logged.
     */
    warn(payload: ILokaloPayload): void;
    /**
     * Logs a payload by info log level.
     *
     * @param payload the payload to be logged.
     */
    info(payload: ILokaloPayload): void;
    /**
     * Logs a payload by debug log level.
     *
     * @param payload the payload to be logged.
     */
    debug(payload: ILokaloPayload): void;
    /**
     * Creates a child logger instance.
     *
     * @example
     * import defLogger from './path/to/logger'
     * const logger = defLogger.child('your.namespace');
     *
     * @param namespace the namspace of the child to create.
     */
    child(namespace: string): LokaloLogger;
}
//# sourceMappingURL=logger.d.ts.map