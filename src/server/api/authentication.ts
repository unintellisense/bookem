import {
  Controller, Get, Req
} from "@tsed/common";
import { AuthState } from '../../shared/dto/auth';

@Controller("/auth")
export class ManageController {

  @Get("/state")
  async getState(@Req() request: Express.Request, ): Promise<AuthState> {
    if (request.user) {
      return { loggedin: true, user: request.user };
    }
    return { loggedin: false };
  }

}