import { LokaloLogger } from './logger';
import type { ILokaloOptions } from './types';
export declare class Lokalo extends LokaloLogger {
    loggers: Set<LokaloLogger>;
    constructor(options: string | Omit<ILokaloOptions, 'parent'>);
    clearAll(): void;
    /**
     * Creates single object from all loggers/namespaces.
     */
    toObject(): Record<string, any>;
}
declare const _default: Lokalo;
export default _default;
//# sourceMappingURL=lokalo.d.ts.map