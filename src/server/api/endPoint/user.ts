import { Router } from 'express';
import { CreateGoogleUser, GetGoogleUser, DeleteGoogleUser } from '../../service/userService';
import { body } from 'express-validator/check';
import { UserSelfModifiable } from '../../../shared/dto/iuser';
import { UserInfo } from '../../../shared/dto/auth';
import { validationErrorHandler } from '../../util/validationUtil';
import { loggedInMiddleWare } from '../authMiddleware/authorizeMiddleware';

const router = Router();

const newUserFields: (keyof UserSelfModifiable)[] = [
  'firstName',
  'lastName'
]

router.post('/',
  loggedInMiddleWare,
  body().custom((body) => { // test for invalid fields
    for (let prop in body) {
      if (!newUserFields.includes(prop as any)) {
        throw new Error(`unexpected field: ${prop}`);
      }
    }
    return true;
  }),
  body('firstName', 'Enter a valid firstName value.').isString().not().isEmpty(),
  body('lastName', 'Enter a valid lastName value.').isString().not().isEmpty(),
  validationErrorHandler,
  async (req, res, next) => {
    try {
      let { firstName, lastName } = req.body;
      let { id, email } = req.user;

      let existingUser = await GetGoogleUser(id);
      if (existingUser) {
        return next(new Error(`Found existing user with matching google identifier.`));
      }
      let newUser = await CreateGoogleUser(id, firstName, lastName, email);

      return res.status(201).json(newUser);
    } catch (e) {
      return res.status(500).json(e.message || 'Unknown error occurred.');
    }
  })

/** TEMP DELETE METHOD for development */

router.delete('/',
  loggedInMiddleWare,
  async (req, res) => {
    let { id } = req.user as UserInfo;
    try {
      await DeleteGoogleUser(id);
      return res.sendStatus(202);
    } catch (e) {
      if (e.code)
        return res.sendStatus(e.code);
    }
  })
// REMEMBER TO REMOVE THIS (or restrict to admin users at least)

export default router;