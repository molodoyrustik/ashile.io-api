import bunyan from 'bunyan';
import express from 'express';
import mongoose from 'mongoose';

import getMiddlewares from './middlewares/index';
import getModels from './models/index';
import getControllers from './controllers/index';
import getUtils from './utils/index';
import getApi from './api/api';

export default class App {
  constructor(params = {}) {
    Object.assign(this, params);
    if (!this.log) this.log = this.getLogger();
    this.init();
  }

  getLogger(params) {
    return bunyan.createLogger(Object.assign({
      name: 'app',
      src: __DEV__,
      level: 'trace',
    }, params))
  }

  getMiddlewares() {
    return getMiddlewares(this);
  }

  getModels() {
    return getModels(this);
  }

  getDatabase() {
    return {
      run: () => {
        new Promise((resolve) => {
          mongoose.connect(this.config.db.url);
          resolve();
        });
      }
    }
  }

  getControllers() {
    return getControllers(this);
  }

  getUtils() {
    return getUtils(this);
  }

  init() {
    this.log.trace('App init');
    this.app = express();
    this.db = this.getDatabase();

    this.utils = this.getUtils();
    this.log.trace('utils', Object.keys(this.utils));

    this.middlewares = this.getMiddlewares();
    this.log.trace('middlewares', Object.keys(this.middlewares));

    this.models = this.getModels();
    this.log.trace('models', Object.keys(this.models));

    this.controllers = this.getControllers();
    this.log.trace('controllers', Object.keys(this.controllers));

    this.useMiddlewares();
    this.useRoutes();
    this.useDefaultRoute();
  }

  useMiddlewares() {
    this.app.use(this.middlewares.catchError);
    this.app.use(this.middlewares.reqLog);
    this.app.use(this.middlewares.accessLogger);
    this.app.use(this.middlewares.reqParser);

    this.app.use(this.controllers.Auth.parseToken);
    this.app.use(this.controllers.Auth.parseUser);
  }
  useRoutes() {
    const api = getApi(this);
    this.app.use('/api/v1', api);
  }
  useDefaultRoute() {
    this.app.use((req, res, next) => {
      const err = ('Route not found');
      next(err);
    });
  }

  async run() {
    this.log.trace('App run');
    try {
      await this.db.run();
    } catch (err) {
      this.log.fatal(err);
    }
    return new Promise((resolve) => {
      this.app.listen(this.config.port, () => {
        this.log.info(`App "${this.config.name}" running on port ${this.config.port}!`);
        resolve(this);
      });
    });
  }
}
