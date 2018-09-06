import { Router, Request, Response } from 'express';
import { check, validationResult } from 'express-validator/check';
import { Book, BookValidations } from '../../db/book'

const router = Router();

router.get('/book',
  /* TODO need a handler to check that they are admin user */
  BookValidations,
  (req: Request, res: Response) => {
    res.sendStatus(200);
  })

export default router;