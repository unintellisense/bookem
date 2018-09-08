import { Router, Request, Response, NextFunction } from 'express';
import { query, param, validationResult } from 'express-validator/check';
import { sanitizeQuery, sanitizeParam } from 'express-validator/filter';
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
      .then(newBook => res.status(201).json(newBook))
      .catch(next);
  },
  objectionErrorHandler
)

router.post('/book/:id',
  param('id', 'for book/:id, id must be integer.').isInt(),
  sanitizeParam('id').toInt(),
  BookValidations,
  validationErrorHandler,
  (req: Request, res: Response, next: NextFunction) => {
    let id = req.param('id');
    let book = req.body;
    Book.query().updateAndFetchById(id, book)
      .then(updatedBook => res.json(updatedBook))
      .catch(next);
  }
)

router.delete('/book/:id',
  param('id', 'for book/:id, id must be integer.').isInt(),
  sanitizeParam('id').toInt(),
  validationErrorHandler,
  (req: Request, res: Response, next: NextFunction) => {
    let id = req.param('id');

    Book.query().delete().where('id', '=', id)
      .then(result => {
        if (result)
          return res.send(`deleted count: ${result}`)
        else
          next('no records deleted.');
      });
  }
)

export default router;