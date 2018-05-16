import * as express from 'express';
import * as knex from 'knex';
import { Model } from 'objection';
import { apiRouter } from './routes/api/api';
import { staticsRouter } from './routes/static/static-router';
import { staticsDevRouter } from './routes/static/static-dev-router';
import * as config from './config';
import dbConfig from './db/knexfile';

initDb();

initWeb();

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
