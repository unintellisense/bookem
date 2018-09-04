import { Router } from 'express';
import { check, validationResult } from 'express-validator/check';
import { Book } from '../../db/book'

const router = Router();

router.get('/book',
  /* TODO need a handler to check that they are admin user */

  (req, res) => {

  })

export default router;