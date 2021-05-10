export declare const ENV_LOG_LEVEL: string | undefined;
export declare const LOG_LEVELS: readonly ["log", "fatal", "error", "warn", "info", "debug"];
export declare const STYLES: {
    inherit: string;
    dim: string;
    log: string;
    fatal: string;
    error: string;
    warn: string;
    info: string;
    debug: string;
};
export declare const DEFAULTS: {
    type: "local";
    maxLines: number;
    key: "$uid" | undefined;
    keyValue: () => number;
    userKey: string;
    level: "error" | "log" | "fatal" | "warn" | "info" | "debug";
    consoleOutput: "development" | "always" | undefined;
    styles: {
        inherit: string;
        dim: string;
        log: string;
        fatal: string;
        error: string;
        warn: string;
        info: string;
        debug: string;
    };
};
//# sourceMappingURL=constants.d.ts.map