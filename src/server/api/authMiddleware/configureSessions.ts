import { Router } from 'express';
import * as session from 'express-session';
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, HOST } from '../../config'
import { APP_COOKIE_NAME } from '../../constants'

function configureSession(router: Router) {
  router.use(session({
    name: APP_COOKIE_NAME,
    secret: GOOGLE_CLIENT_SECRET  /* reuse this secret for now*/,
    resave: false,
    saveUninitialized: false
  }));
}

export default configureSession;