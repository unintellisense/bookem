import { Router } from 'express';
import Book from '../../../db/book'

const manageRouter = Router();

manageRouter.get(('/book'), async (req, res) => {
  res.send('GET BOOK');
})

manageRouter.post(('/book'), async (req, res) => {

  // let newBook: Book = {
  //   title: req.query.title,
  //   isbn: req.query.isbn

  // }
  // let book = Book.query()
  //   .insert({
  //     isbn: ''
  //   })

  res.send('POST BOOK');
})


export { manageRouter };
