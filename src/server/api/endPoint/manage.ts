import { Router, Request, Response, NextFunction } from 'express';
import { query, validationResult } from 'express-validator/check';
import { sanitizeQuery } from 'express-validator/filter';
import * as qs from 'qs';
import { Book, BookValidations } from '../../db/book'

const router = Router();

router.get('/book',
  /* TODO need a handler to check that they are admin user */
  query('page').isInt(), sanitizeQuery('page').toInt(),
  query('count').isInt(), sanitizeQuery('count').toInt(),
  query('qry').isString().optional(),
  (req: Request, res: Response, next: NextFunction) => {
    // validate
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    let { page, count, qry } = req.query;
    let bookQry = Book.query();
    if (qry) {
      let qryObj = qs.parse(qry);
      for (let field in qryObj) {
        let val = qryObj[field];
        if (field === 'isFiction') // convert isFiction to boolean
          val = (val === 'true');
        bookQry = bookQry.where(field, 'like', `%${val}%`);
      }
    }
    bookQry.page(page, count)
      .select()
      .then(books => res.json(books)).catch(next);
  })

router.post('/book',
  /* TODO need a handler to check that they are admin user */
  BookValidations,
  (req: Request, res: Response) => {

    res.sendStatus(201);
  })

export default router;