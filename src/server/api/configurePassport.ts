import { Router, Request, Response } from 'express';
import * as Passport from 'passport';
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';
import { UserInfo } from '../../shared/dto/auth'
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, HOST } from './../config'

function configurePassport(router: Router) {
  Passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: HOST + '/api/auth/google/callback'
  },
    function (accessToken, refreshToken, profile, done) {
      process.nextTick(function () {
        return done(null, profile.id);
      });
    }));

  Passport.serializeUser(function (userId: number, done) {
    done(null, userId);
  });

  Passport.deserializeUser(function (userId: number, done: (err: any, user?: UserInfo) => void) {
    done(null, { id: userId, role: 'admin' }); //temp hack for testing
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
    (req: Request, res: Response) => {
      res.redirect('/');
    }
  );

}

export default configurePassport;