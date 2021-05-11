import { LokaloLogger } from './logger';
export declare class Lokalo extends LokaloLogger {
    static __instance: Lokalo;
    loggers: Set<LokaloLogger>;
    constructor();
    static get singleton(): Lokalo;
    clearAll(): void;
}
declare const _default: Lokalo;
export default _default;
//# sourceMappingURL=lokalo.d.ts.map