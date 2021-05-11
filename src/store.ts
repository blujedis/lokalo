import { formatNamespace, formatter, getTimestamp } from './utils';
import type { ILokaloEvent, ILokaloStoreOptions, Style } from './types';

export class LokaloStore {

  namespace: string;
  store: Storage = localStorage;
  queue: ILokaloEvent[] = [];
  queueId: any;

  options: Required<ILokaloStoreOptions>;

  constructor(options: ILokaloStoreOptions) {
    this.namespace = options.parent ? formatNamespace(options.namespace, options.parent) : options.namespace;
    this.store = options.type === 'local' ? localStorage : sessionStorage;
    this.options = options as Required<ILokaloStoreOptions>;
  }

  /**
   * Mutes the output to console only logs.
   */
  mute() {
    this.options.displayOutput = false;
  }

  /**
  * Unmutes the output to console and displays in console.
  */
  unmute() {
    this.options.displayOutput = true;
  }

  /**
   * Gets namespaced value by key.
   * 
   */
  getNamespace(): ILokaloEvent[] {
    const obj = this.store.getItem(this.namespace);
    return obj && obj.length ? JSON.parse(obj) : [];
  }

  /**
   * Sets a namespace's value.
   * 
   * @param data the value to set to the namespace.
   */
  setNamespace(data: ILokaloEvent | ILokaloEvent[]) {
    if (!data) return;
    if (!Array.isArray(data))
      data = [data];
    const str = JSON.stringify(data);
    this.store.setItem(this.namespace, str);
  }

  /**
   * Removes from storage by namespace.
   */
  removeNamespace() {
    this.clearQueue();
    this.store.removeItem(this.namespace);
  }

  /**
   * Deletes rows for the given namespace.
   * 
   * @param count the number of rows to delete if not 1.
   */
  removeRows(count = 1) {
    let rows = this.getNamespace();
    rows = rows.sort((a, b) => {
      if (a.timestamp > b.timestamp)
        return 1;
      else if (a.timestamp < b.timestamp)
        return -1;
      else
        return 0;
    }).slice(count);
    this.setNamespace(rows);
  }

  /**
   * Gets the number of rows for a namespace.
   */
  size() {
    return this.getNamespace().length;
  }

  /**
   * Checks the maximum lines size.
   */
  checkMaxLines() {
    if (!this.options.maxLines) return;
    const count = this.size();
    if (count === this.options.maxLines) {
      this.removeRows();
    }
    else if (count > this.options.maxLines) {
      const adj = count - this.options.maxLines;
      this.removeRows(adj);
    }
  }

  /**
   * Returns rows for the active namespace.
   * 
   * @param limit value used to limit returned rows.
   */
  rows(limit = 0) {
    let rows = this.getNamespace().reverse();
    if (this.queue.length)
      rows = [...this.queue, ...rows];
    if (limit)
      rows = rows.slice(0, limit);
    return rows;
  }

  /**
   * Clears the current namespace.
   */
  clear() {
    return this.removeNamespace();
  }

  /**
   * Purges lines from the logger.
   * 
   * @param lines the number of lines to purge.
   */
  purge(lines = 1) {
    return this.removeRows(lines);
  }

  queuePayload(payload: ILokaloEvent) {

    this.queue.push(payload);
    this.resetQueue();

    if (!this.options.displayOutput)
      return;

    const tsKey = getTimestamp().split('T')?.pop()?.slice(0, -1).trim(); // time only.
    const truncMessage = payload.message.slice(0, 20);

    const groupLabel = formatter(this.options.styles)
      .add(payload.level as Style, tsKey)
      .unstyled(this.namespace)
      .unstyled('-')
      .add('dim', truncMessage)
      .toString();

    console.groupCollapsed(...groupLabel);
    console.log(payload);
    console.groupEnd();

  }

  /**
   * Writes the payload to storage by namespace.
   * 
   * @param payload the payload to be written.
   */
  writePayload(payload: ILokaloEvent) {
    const rows = [...this.getNamespace(), payload];
    this.setNamespace(rows);
  }

  /**
  * Clears the log queue.
  */
  clearQueue() {
    if (this.queueId)
      clearInterval(this.queueId);
    this.queue = [];
  }

  /**
   * Resets queue timer but leaves queue payloads.
   */
  resetQueue() {
    clearInterval(this.queueId);
    this.startQueue();
  }

  /**
   * Starts the log queue.
   */
  startQueue() {
    this.queueId = setInterval(() => {
      const payload = this.queue.shift();
      if (payload)
        this.writePayload(payload as ILokaloEvent);
      if (!this.queue.length)
        this.clearQueue();
    }, 100);
  }

}
