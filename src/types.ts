import type { LOG_LEVELS, STYLES } from './constants';

export type ILokaloPayload = string | number | boolean | (Error & { [key: string]: any }) | Record<string, any>;
export type LokaloOptions = Omit<ILokaloOptions, 'parent'>;
export type LogLevelInternal = typeof LOG_LEVELS[number];
export type LogLevel = Omit<LogLevelInternal, 'log'>;
export type Styles = typeof STYLES;
export type Style = keyof Styles;

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

