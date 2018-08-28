import { Controller, Get, Post, Req, Status, Res } from "@tsed/common";
import { NotFound } from 'ts-httpexceptions';
import { AuthState, LoginState } from '../../shared/dto/auth';

@Controller("/auth")
export class AuthController {

  @Get("/state")
  async getState(@Req() request: Express.Request): Promise<AuthState> {
    if (request.user) {
      return { loginState: LoginState.LoggedIn, user: request.user };
    }
    return { loginState: LoginState.LoggedOut };
  }

  @Post("/logout")
  @Status(204)
  async logOut(@Req() request: Express.Request, @Res() response: Express.Response) {
    if (request.user) {
      request.logout();
      response.clearCookie();
      return null;
    }
    response.clearCookie();
    throw new NotFound("no login session.");
  }

}