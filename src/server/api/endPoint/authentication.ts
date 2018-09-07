import { Router } from 'express';
import { LoginState } from '../../../shared/dto/auth';
import { APP_COOKIE_NAME } from '../../constants'

const router = Router();

router.get('/state', (req, res) => {
  if (req.user) {
    //TODO send proper response
    res.json({ loginState: LoginState.LoggedIn, user: req.user })
  } else {
    res.json({ loginState: LoginState.LoggedOut });
  }
});

router.get('/logout', (req, res) => {
  res.clearCookie(APP_COOKIE_NAME);
  if (req.user) req.logout();

  res.status(304);
  res.redirect("/");
})

export default router;