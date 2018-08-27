import { Controller, Get, Post, Req, Status } from "@tsed/common";
import { NotFound } from 'ts-httpexceptions';
import { AuthState, LoginState } from '../../shared/dto/auth';

@Controller("/auth")
export class ManageController {

  @Get("/state")
  async getState(@Req() request: Express.Request, ): Promise<AuthState> {
    if (request.user) {
      return { loginState: LoginState.LoggedIn, user: request.user };
    }
    return { loginState: LoginState.LoggedOut };
  }

  @Post("/logout")
  @Status(204)
  async logOut(@Req() request: Express.Request, ) {
    if (request.user) {
      request.logout();
      return null;
    }
    throw new NotFound("no login session.");
  }

}