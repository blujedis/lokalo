import type { Style, Styles } from './types';
/**
 * Creates instance of simple formatter.
 */
export declare function formatter(styles: Styles): {
    tokens: string[];
    styles: string[];
    add: (style: Style, label: any) => any;
    unstyled: (label: any) => any;
    toString: () => string[];
};
/**
 * Gets a timestamp.
 *
 * @param date optional date.
 */
export declare function getTimestamp(date?: number): string;
/**
 * Normalizes a namespace.
 *
 * @param ns the namespace to format.
 * @param parent the parent to be prefixed.
 */
export declare function formatNamespace(ns: string, parent: string): string;
/**
 * Converts an error to object literal.
 *
 * @param err the error to convert to object
 */
export declare function serializeError<E extends Error>(err: E & {
    [key: string]: any;
}): Record<keyof E, any>;
/**
 * Generate UUID v4.
 */
export declare function uuidv4(): string;
//# sourceMappingURL=utils.d.ts.map