import { LokaloLogger } from './logger';
import { set as setValue } from 'dot-prop';
import type { ILokaloOptions } from './types';

export class Lokalo extends LokaloLogger {

  loggers = new Set<LokaloLogger>();

  constructor(options: string | Omit<ILokaloOptions, 'parent'>) {
    super(typeof options === 'string' ? { namespace: options } : options);
    this.loggers.add(this);
  }

  clearAll() {
    const loggers = [...this.loggers.values()];
    loggers.forEach(logger => logger.clear());
  }

  /**
   * Creates single object from all loggers/namespaces.
   */
  toObject() {
    let obj = {} as Record<string, any>;
    [...this.loggers.values()].forEach(logger => {
      const namespace = logger.namespace;
      const rows = logger.rows();
      setValue(obj, namespace, rows);
    });
    return obj;
  }

}

export default new Lokalo({ namespace: 'lokalo' });
