import { ServerLoader, ServerSettings } from "@tsed/common";

if (process.env.BUILD_FLAG === "development") {
  // import swagger Ts.ED module
  require("@tsed/swagger");
}
// import validations. TODO check if this safe to move into development
require("@tsed/ajv");
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as knex from 'knex';
import * as path from 'path';
import { Model } from 'objection';
import { staticsRouter } from '../static/static-router';
import { staticsDevRouter } from '../static/static-dev-router';
import { PORT } from '../config'
const dbConfig = require('./db/knexfile');

const rootDir = path.resolve(__dirname);
const clientDir = path.resolve(__dirname, '..', 'client');

@ServerSettings({
  rootDir,
  acceptMimes: ["application/json"],
  port: PORT,
  mount: {
    "/api": `${rootDir}/api/**/**.js`
  },
  swagger: [
    {
      path: "/api-docs"
    }
  ],
  exclude: ['**/*.spec.ts', '**/*.spec.js', '**/*.js.map'],
  componentsScan: [
    `${rootDir}/converters/**/**.js`,
    `${rootDir}/auth/**/**.js`
  ],
  validationModelStrict: true
})

class Server extends ServerLoader {

  async $onInit() {
    let knexConnector = knex(dbConfig.development);
    // perform any pending migrations
    await knexConnector.migrate.latest();
    Model.knex(knexConnector);
    console.log('db initialized.');
  }

  async $onMountingMiddlewares() {
    // any middleware which routes depend on goes here
    this.use(bodyParser.json());
    console.log('middleware mounted.');
  }
  async $afterRoutesInit() {
    /** static route setup */
    let staticRouter: express.Router;
    if (process.env.BUILD_FLAG === "development") { // production builds will reduce this via gulp-uglify
      staticRouter = staticsDevRouter()
    } else {
      staticRouter = staticsRouter();
    }
    this.use("/", staticRouter);
    console.log('static mounted.');
  }

  public $onReady() {
    console.log(`App listening on port ${PORT}.`);
  }

  public $onServerInitError(err) {
    console.error(`Error occurred during server initialization: ${err}`);
  }
}

new Server().start();