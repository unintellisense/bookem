import * as Passport from 'passport';
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';
import * as session from 'express-session';
import { Service, BeforeRoutesInit, AfterRoutesInit, ServerSettingsService, Inject, ExpressApplication } from "@tsed/common";
import { Request, Response } from 'express'
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, HOST } from '../config'

@Service()
export class AuthService implements BeforeRoutesInit, AfterRoutesInit {

  constructor(@Inject(ExpressApplication) private app: ExpressApplication) {

  }

  $beforeRoutesInit() {

    Passport.use(new GoogleStrategy({
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: HOST + '/auth/google/callback'
    },
      function (accessToken, refreshToken, profile, done) {
        process.nextTick(function () {
          return done(null, profile.id);
        });
      }));

    Passport.serializeUser(function (user, done) {
      done(null, user);
    });

    Passport.deserializeUser(function (user, done) {
      done(null, user);
    });
    this.app.use(session({ secret: GOOGLE_CLIENT_SECRET  /* reuse this secret for now*/ }));
    this.app.use(Passport.initialize());
    this.app.use(Passport.session());

    this.app.get('/auth/google', Passport.authenticate('google', {
      scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/plus.login'
      ]
    }));

    this.app.get('/auth/google/callback',
      Passport.authenticate('google', { failureRedirect: '/login' }),
      this.authCallbackHandler
    );

  }

  $afterRoutesInit() {
    //this.initializeSignup();
    //this.initializeLogin();
  }

  authCallbackHandler = (req: Request, res: Response) => {
    // write out the user profile into a cookie for the app

    //var user = _.omit(req.user, ['_raw', '_json']);
    //res.cookie('sheetuser', JSON.stringify(user));

    // redirect to app's home
    //res.redirect(appFolder); MYSTERIOUS BUG
    res.redirect('/'); // hacky workaround
  }
}
