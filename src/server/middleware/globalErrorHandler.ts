import { Request as ExpressRequest, Response as ExpressResponse } from "express";
import { GlobalErrorHandlerMiddleware, Req, Res, Err, OverrideMiddleware } from "@tsed/common";
import { Exception } from "ts-httpexceptions";

@OverrideMiddleware(GlobalErrorHandlerMiddleware)
export class GlobalErrorHandler {

  use(@Err() error: any,
    @Req() request: ExpressRequest,
    @Res() response: ExpressResponse): any {

    if (error instanceof Exception || error.status) {
      request.log.error({
        error: {
          message: error.message,
          stack: error.stack,
          status: error.status
        }
      });
      response.status(error.status).send(error.message);
      return;
    }

    if (typeof error === "string") {
      response.status(404).send(error);
      return;
    }

    request.log.error({
      error: {
        status: 500,
        message: error.message,
        stack: error.stack
      }
    });
    response.status(error.status || 500).send("Internal Error");

    return;
  }

}