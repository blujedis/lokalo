import { LokaloLogger } from './logger';

export class Lokalo extends LokaloLogger {

  static __instance: Lokalo;
  loggers = new Set<LokaloLogger>();

  constructor() {
    super({ namespace: 'lokalo', parent: '' });
    this.loggers.add(this);
  }

  static get singleton() {
    if (!Lokalo.__instance)
      Lokalo.__instance = new this();
    return Lokalo.__instance;
  }

  clearAll() {
    const loggers = [...this.loggers.values()];
    loggers.forEach(logger => logger.clear());
  }

}

export default Lokalo.singleton;
