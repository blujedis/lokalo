import type { ILokaloEvent, ILokaloStoreOptions } from './types';
export declare class LokaloStore {
    namespace: string;
    store: Storage;
    queue: ILokaloEvent[];
    queueId: any;
    options: Required<ILokaloStoreOptions>;
    constructor(options: ILokaloStoreOptions);
    /**
     * Mutes the output to console only logs.
     */
    mute(): void;
    /**
    * Unmutes the output to console and displays in console.
    */
    unmute(): void;
    /**
     * Gets namespaced value by key.
     *
     */
    getNamespace(): ILokaloEvent[];
    /**
     * Sets a namespace's value.
     *
     * @param data the value to set to the namespace.
     */
    setNamespace(data: ILokaloEvent | ILokaloEvent[]): void;
    /**
     * Removes from storage by namespace.
     */
    removeNamespace(): void;
    /**
     * Deletes rows for the given namespace.
     *
     * @param count the number of rows to delete if not 1.
     */
    removeRows(count?: number): void;
    /**
     * Gets the number of rows for a namespace.
     */
    size(): number;
    /**
     * Checks the maximum lines size.
     */
    checkMaxLines(): void;
    /**
     * Returns rows for the active namespace.
     *
     * @param limit value used to limit returned rows.
     */
    rows(limit?: number): ILokaloEvent[];
    /**
     * Clears the current namespace.
     */
    clear(): void;
    /**
     * Purges lines from the logger.
     *
     * @param lines the number of lines to purge.
     */
    purge(lines?: number): void;
    queuePayload(payload: ILokaloEvent): void;
    /**
     * Writes the payload to storage by namespace.
     *
     * @param payload the payload to be written.
     */
    writePayload(payload: ILokaloEvent): void;
    /**
    * Clears the log queue.
    */
    clearQueue(): void;
    /**
     * Resets queue timer but leaves queue payloads.
     */
    resetQueue(): void;
    /**
     * Starts the log queue.
     */
    startQueue(): void;
}
//# sourceMappingURL=store.d.ts.map