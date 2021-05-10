import type { Style, Styles } from './types';

/**
 * Creates instance of simple formatter.
 */
export function formatter(styles: Styles) {

  const _tokens = [] as string[];
  const _styles = [] as string[];

  const api = {
    tokens: _tokens,
    styles: _styles,
    add,
    unstyled,
    toString
  };

  /**
   * Adds a styled value to tokens to be formatted.
   * 
   * @param style the style to be applied.
   * @param label the value to apply style to.
   */
  function add(style: Style, label: any) {
    _tokens.push(`%c` + label)
    _styles.push(styles[style]);
    return api;
  }

  /**
   * Add unstyled value.
   * 
   * @param label the value to be unstyled.
   */
  function unstyled(label: any) {
    return add('inherit', label);
  }

  /**
   * Converts tokens and values to styled result for logging.
   */
  function toString() {
    return [_tokens.join(' '), ..._styles];
  }

  return api;

}

/**
 * Gets a timestamp.
 * 
 * @param date optional date.
 */
export function getTimestamp(date = Date.now()) {
  return (new Date(date)).toISOString();
}

/**
 * Normalizes a namespace.
 * 
 * @param ns the namespace to format.
 * @param parent the parent to be prefixed.
 */
export function formatNamespace(ns: string, parent: string) {
  const segments = [...parent.split('.'), ns];
  return segments.join('.');
}

/**
 * Converts an error to object literal.
 * 
 * @param err the error to convert to object
 */
export function serializeError<E extends Error>(err: E & { [key: string]: any }) {
  if (!(err instanceof Error))
    return err;
  const result = Object.getOwnPropertyNames(err).reduce((a, c) => {
    a[c as keyof E] = err[c];
    return a;
  }, {} as Record<keyof E, any>);
  if (err.name && !result.name)
    result.name = err.name;
  return result;
}
