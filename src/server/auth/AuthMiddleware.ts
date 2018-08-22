import { Request } from 'express';
import { OverrideMiddleware, AuthenticatedMiddleware, IMiddleware, EndpointInfo, EndpointMetadata, Next, Request as Req } from "@tsed/common";
import { Forbidden } from "ts-httpexceptions";
import * as Passport from 'passport';

@OverrideMiddleware(AuthenticatedMiddleware)
export class AuthMiddleWare implements IMiddleware {
  public use(@EndpointInfo() endpoint: EndpointMetadata,
    @Req() request: Request,
    @Next() next: Express.NextFunction) { // next is optional here

    // options given to the @Authenticated decorator
    const options = endpoint.get(AuthenticatedMiddleware) || {};
    // options => {role: 'admin'}

    if (!request.isAuthenticated()) { // passport.js
      throw new Forbidden("Forbidden")
    }

    next();
  }
}