import { ServerLoader, ServerSettings, GlobalAcceptMimesMiddleware } from "@tsed/common";
import * as express from 'express';
import * as knex from 'knex';
import * as path from 'path';
import { Model } from 'objection';
import { ManageController } from './controllers/manage';
import { apiRouter } from './routes/api/api';
import { staticsRouter } from './static/static-router';
import { staticsDevRouter } from './static/static-dev-router';
import dbConfig from './db/knexfile';

console.log("*** " + path.resolve(__dirname, "/api") + " ***")

const rootDir = path.resolve(__dirname);
const clientDir = path.resolve(__dirname, '..', 'client');
@ServerSettings({
  rootDir,
  //acceptMimes: ["application/json"],
  port: process.env.PORT || 3000,
  mount: {
    "/api": `${rootDir}/controllers/**/**.js`
  },
  exclude: ['**/*.spec.ts', '**/*.spec.js', '**/*.js.map']
})

class Server extends ServerLoader {

  $afterRoutesInit(): void | Promise<any> {
    /** static route setup */
    let staticRouter: express.Router;
    if (process.env.BUILD_FLAG === "development") { // production builds will reduce this via gulp-uglify
      staticRouter = staticsDevRouter()
    } else {
      staticRouter = staticsRouter();
    }
    this.use("/", staticRouter);

  }

  public $onReady() {
    console.log('Server started...');
  }

  public $onServerInitError(err) {
    console.error(err);
  }
}

new Server().start();


initDb();

function initDb() {
  let knexConnector = knex(dbConfig.development);
  Model.knex(knexConnector);

}

function initWeb() {
  const app = express();
  app.use('/api', apiRouter);

  let staticRouter: express.Router = staticsRouter();
  if (process.env.BUILD_FLAG === "development") { staticRouter = staticsDevRouter() }
  app.use(staticRouter);

  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`App listening on port ${port}!`));
}
