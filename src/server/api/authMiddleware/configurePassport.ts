import { Router, Request, Response, NextFunction } from 'express';
import * as Passport from 'passport';
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';
import { UserInfo } from '../../../shared/dto/auth'
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, HOST } from '../../config'
import { User, UserProviderType } from '../../db/user'
import { GetGoogleUser } from '../../service/userService';

type GoogleProfileInfo = {
  // when we add support for a separate identity provider
  // will need to probably include a 'provider' field or something similar 
  email: string
  id: string
}

function configurePassport(router: Router) {
  Passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: HOST + '/api/auth/google/callback'
  },
    function (accessToken, refreshToken, profile, done) {
      process.nextTick(function () {
        let email: string = (Array.isArray(profile.emails) && profile.emails.find((row => row.type === 'account')).value);
        let googleInfo: GoogleProfileInfo = {
          email: email,
          id: profile.id
        }
        return done(null, googleInfo);
      });
    }));

  Passport.serializeUser(function (userInfo: GoogleProfileInfo, done) {
    done(null, userInfo);
  });

  Passport.deserializeUser(function (userInfo: GoogleProfileInfo, done: (err: any, user?: UserInfo) => void) {
    done(null, { id: userInfo.id, role: 'admin' }); //temp hack for testing
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
        return res.redirect('Signup');
      } catch (e) {
        next(e);
      }
    }

  );

}

export default configurePassport;