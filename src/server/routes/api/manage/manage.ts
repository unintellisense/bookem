import { Router } from 'express';

const manageRouter = Router();

manageRouter.get(('/book'), async (req, res) => {
  res.send('GET BOOK');
})

manageRouter.post(('/book'), async (req, res) => {
  res.send('POST BOOK');
})


export { manageRouter };
