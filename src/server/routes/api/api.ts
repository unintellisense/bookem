import { Router } from 'express';
import { manageRouter } from './manage/manage'

const apiRouter = Router();

apiRouter.use('/manage', manageRouter);

export { apiRouter };
