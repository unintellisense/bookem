import { Router } from 'express';
import { LoginState } from '../../../shared/dto/auth';
import { APP_COOKIE_NAME } from '../../constants'
import { GetGoogleUser } from '../../service/userService';

const router = Router();

router.get('/state', async (req, res) => {
  if (req.user) {
    //TODO send proper response
    let user = await GetGoogleUser(req.user.id);
    if (user) {
      return res.json({ loginState: LoginState.LoggedIn, user: req.user });
    }
    return res.json({ loginState: LoginState.LoggedInNoUser, user: req.user });
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