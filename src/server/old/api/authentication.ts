import { Controller, Get, Req, Status, Res } from "@tsed/common";
import { NotFound } from 'ts-httpexceptions';
import { AuthState, LoginState } from '../../../shared/dto/auth';
import { Request, Response } from 'express';
import { APP_COOKIE_NAME } from '../../constants'
@Controller("/auth")
export class AuthController {

  @Get("/state")
  async getState(@Req() request: Request): Promise<AuthState> {
    if (request.user) {
      return { loginState: LoginState.LoggedIn, user: request.user };
    }
    return { loginState: LoginState.LoggedOut };
  }

  @Get("/logout")  
  async logOut(@Req() request: Request, @Res() response: Response) {
    response.clearCookie(APP_COOKIE_NAME);
    if (request.user) {
      request.logout();      
      response.status(304);
    }else {
      response.status(404);
    }
    response.redirect("/");
  }

}