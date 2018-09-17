import { Router } from 'express';
import { CreateGoogleUser } from '../../service/userService';
import { body } from 'express-validator/check';

const router = Router();

router.post('/',
  body('firstName', 'Enter a valid first name.').isString().not().isEmpty(),
  body('lastName', 'Enter a valid last name.').isString().not().isEmpty(),
  async (req, res) => {
    let { firstName, lastName } = req.body;
    let { id, email } = req.user;
    let newUser = await CreateGoogleUser(id, firstName, lastName, email);

    res.status(201).json(newUser);
  })

export default router;