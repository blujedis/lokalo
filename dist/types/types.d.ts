import type { LOG_LEVELS, STYLES } from './constants';
export declare type ILokaloPayload = string | number | boolean | (Error & {
    [key: string]: any;
}) | Record<string, any>;
export declare type LokaloOptions = Omit<ILokaloOptions, 'parent'>;
export declare type LogLevelInternal = typeof LOG_LEVELS[number];
export declare type LogLevel = Omit<LogLevelInternal, 'log'>;
export declare type Styles = typeof STYLES;
export declare type Style = keyof Styles;
export interface ILokaloStoreOptions {
    readonly parent?: string;
    namespace: string;
    maxLines?: number;
    type?: 'local' | 'session';
    displayOutput?: boolean;
    styles?: Record<Style, string>;
}
export interface ILokaloOptions extends ILokaloStoreOptions {
    uid?: () => string | number;
    level?: LogLevel;
}
export interface ILokaloEvent {
    id: string | number;
    level: LogLevelInternal;
    timestamp: string;
    namespace: string;
    message: string;
    [key: string]: any;
}
export interface ILokaloEvents {
    [key: string]: ILokaloEvent;
}
//# sourceMappingURL=types.d.ts.map