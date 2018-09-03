import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as knex from 'knex';
import * as path from 'path';
import { Model } from 'objection';
import { staticsRouter } from './static/static-router';
import { staticsDevRouter } from './static/static-dev-router';
import ApiRouter from './api';
import { PORT } from './config'
const dbConfig = require('./db/knexfile');

const rootDir = path.resolve(__dirname);
const clientDir = path.resolve(__dirname, '..', 'client');

class Server {

  public async startup() {
    await this.initializeDb();

    let app = express();
    app.use(bodyParser.json());
    
    // mount api endpoints here
    app.use('/api', ApiRouter);
    
    // mount static endpoint here
    let staticRouter = this.getStaticRouter();
    app.use("/", staticRouter);
    // mount passport here

    

    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}.`);
    }).on('error', err => {
      console.error(`Error occurred during server initialization: ${err}`)
    })
  }

  private async initializeDb() {
    let knexConnector = knex(dbConfig.development);
    // perform any pending migrations
    await knexConnector.migrate.latest();
    Model.knex(knexConnector);
    console.log('db initialized.');
  }

  private getStaticRouter() {
    let staticRouter: express.Router;
    if (process.env.BUILD_FLAG === "development") { // production builds will reduce this via gulp-uglify
      staticRouter = staticsDevRouter();
    } else {
      staticRouter = staticsRouter();
    }
    return staticRouter;
  }

}

new Server().startup();