import { ServerLoader, ServerSettings, GlobalAcceptMimesMiddleware } from "@tsed/common";
import "@tsed/ajv";
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as knex from 'knex';
import * as path from 'path';
import { Model } from 'objection';
import { staticsRouter } from './static/static-router';
import { staticsDevRouter } from './static/static-dev-router';
import dbConfig from './db/knexfile';

const rootDir = path.resolve(__dirname);
const clientDir = path.resolve(__dirname, '..', 'client');

const portNumber = process.env.PORT || 3000;

@ServerSettings({
  rootDir,
  acceptMimes: ["application/json"],
  port: portNumber,
  mount: {
    "/api": `${rootDir}/api/**/**.js`
  },
  exclude: ['**/*.spec.ts', '**/*.spec.js', '**/*.js.map']
})

class Server extends ServerLoader {

  $onInit(): void | Promise<any> {
    let knexConnector = knex(dbConfig.development);
    Model.knex(knexConnector);
    console.log('db initialized.');
  }

  $onMountingMiddlewares(): void | Promise<any> {
    // any middleware which routes depend on goes here
    this.use(bodyParser.json());
    console.log('middleware mounted.');
  }
  $afterRoutesInit(): void | Promise<any> {
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
    console.log(`App listening on port ${portNumber}.`);
  }

  public $onServerInitError(err) {
    console.error(`Error occurred during server initialization: ${err}`);
  }
}

new Server().start();