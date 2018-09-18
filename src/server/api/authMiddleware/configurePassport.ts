import { Router, Request, Response, NextFunction } from 'express';
import * as Passport from 'passport';
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';
import { UserInfo } from '../../../shared/dto/auth'
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, HOST } from '../../config'
import { GetGoogleUser } from '../../service/userService';
import { IdentityProviderType } from '../../../shared/dto/iuser';

function configurePassport(router: Router) {
  Passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: HOST + '/api/auth/google/callback'
  },
    function (accessToken, refreshToken, profile, done) {
      process.nextTick(function () {
        let email: string = (Array.isArray(profile.emails) && profile.emails.find((row => row.type === 'account')).value);
        let googleInfo: UserInfo = {
          email: email,
          id: profile.id,
          providerType: IdentityProviderType.Google
        }
        return done(null, googleInfo);
      });
    }));

  Passport.serializeUser(function (userInfo: UserInfo, done) {
    done(null, userInfo);
  });

  Passport.deserializeUser(function (userInfo: UserInfo, done: (err: any, user?: UserInfo) => void) {
    done(null, { id: userInfo.id, role: 'admin', email: userInfo.email, providerType: userInfo.providerType }); //temp hack for testing
  });


  router.use(Passport.initialize());
  router.use(Passport.session());

  router.get('/auth/google', Passport.authenticate('google', {
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/plus.login'
    ]
  }));

  router.get('/auth/google/callback',
    Passport.authenticate('google', { failureRedirect: '/login' }),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        let user = await GetGoogleUser(req.user.id);
        if (user) { // signed up already
          return res.redirect('/');
        }
        // no user found
        return res.redirect('signup');
      } catch (e) {
        next(e);
      }
    }

  );

}

export default configurePassport;