import type { LOG_LEVELS, STYLES } from './constants';
export interface IStorageLoggerOptions<K extends string = '$uid'> {
    readonly parent: string;
    type?: 'session' | 'local';
    namespace: string;
    maxLines?: number;
    key?: K;
    keyValue?: () => string | number;
    userKey?: string;
    level?: Omit<LogLevel, 'log'>;
    consoleOutput?: 'development' | 'always';
    styles?: Record<Style, string>;
}
export declare type StorageLoggerPayload = string | number | boolean | (Error & {
    [key: string]: any;
}) | Record<string, any>;
export declare type StorageLoggerOptions = Omit<IStorageLoggerOptions, 'parent'>;
export interface IStorageLoggerEvent<U extends Record<string, any> = Record<string, any>> {
    level: LogLevel;
    timestamp: string;
    namespace: string;
    message: string;
    user?: U;
    [key: string]: any;
}
export interface IStorageLoggerEvents {
    [key: string]: StorageLoggerEvent;
}
export declare type LogLevel = typeof LOG_LEVELS[number];
export declare type StorageLoggerEvent<K extends string = '$uid', U extends Record<string, any> = Record<string, any>> = Record<keyof K, string | number> & IStorageLoggerEvent<U>;
export declare type Styles = typeof STYLES;
export declare type Style = keyof Styles;
//# sourceMappingURL=types.d.ts.map