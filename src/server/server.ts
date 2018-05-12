import * as express from 'express';
//import { apiRouter } from './routes/api-router';
import { staticsRouter } from './routes/static/static-router';
import { staticsDevRouter } from './routes/static/static-dev-router';
import * as config from './config';

const app = express();

// app.use(apiRouter());

let staticRouter: express.Router = staticsRouter();

if (process.env.BUILD_FLAG === "development") {
  staticRouter = staticsDevRouter()
}

app.use(staticRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`App listening on port ${port}!`));