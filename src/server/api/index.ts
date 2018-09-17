import { Router } from 'express';
import configureSessions from './authMiddleware/configureSessions'
import configurePassport from './authMiddleware/configurePassport'

import AuthRouter from './endPoint/authentication';
import ManageRouter from './endPoint/manage';
import UserRouter from './endPoint/user'


const router = Router();

// configure sessions
configureSessions(router);

// configure passport
configurePassport(router);

router.use('/auth', AuthRouter);
router.use('/manage', ManageRouter);
router.use('/user', UserRouter);



export default router;