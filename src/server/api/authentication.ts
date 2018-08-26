import {
  Controller, Get, Req
} from "@tsed/common";
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

}