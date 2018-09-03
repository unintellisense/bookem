import { Router } from 'express';
import configureSessions from './configureSessions'
import configurePassport from './configurePassport'

import AuthRouter from './authentication';
import ManageRouter from './manage';

const router = Router();

// configure sessions
configureSessions(router);

// configure passport
configurePassport(router);

router.use('/auth', AuthRouter);
router.use('/manage', ManageRouter);



export default router;