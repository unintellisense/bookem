import { Router, Request, Response, NextFunction } from 'express';
import { query, validationResult } from 'express-validator/check';
import { sanitizeQuery } from 'express-validator/filter';
import * as qs from 'qs';
import { Book, BookValidations } from '../../db/book'
import { validationErrorHandler } from '../../util/validationUtil'
import { objectionErrorHandler } from '../../util/objectionUtil'
const router = Router();

router.get('/book',
  /* TODO need a handler to check that they are admin user */
  query('page').isInt(), sanitizeQuery('page').toInt(),
  query('count').isInt(), sanitizeQuery('count').toInt(),
  query('qry').isString().optional(),
  validationErrorHandler,
  (req: Request, res: Response, next: NextFunction) => {
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
      .then(books => res.json(books))
      .catch(next);
  },
  objectionErrorHandler
)

router.post('/book',
  /* TODO need a handler to check that they are admin user */
  BookValidations,
  validationErrorHandler,
  (req: Request, res: Response, next: NextFunction) => {
    let book = req.body;
    Book.query().insert(book)
      .then(() => res.sendStatus(201))
      .catch(next);
  },
  objectionErrorHandler
)

export default router;