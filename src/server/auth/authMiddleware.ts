import * as Passport from 'passport';
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';
import * as session from 'express-session';
import { Service, BeforeRoutesInit, AfterRoutesInit, ServerSettingsService, Inject, ExpressApplication } from "@tsed/common";
import { Request, Response } from 'express'
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, HOST } from './../config'
import { UserInfo } from './../../shared/dto/auth'
import { APP_COOKIE_NAME } from './../constants'

