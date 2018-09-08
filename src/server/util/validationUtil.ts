import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator/check';

// keep for now, but delete if unused.
// really keeping around because this was a learning exercise,
// just turns out this approach wouldn't work.

/*

type GetArgs<F extends Function> = F extends (...args: infer A) => any ? A : never;
type BodyArgs = GetArgs<typeof body>
type BodyArgsForType<T> = BodyArgs[0] & keyof T

export function bodyValidationForType<T>(field: BodyArgsForType<T>) {
  return body(field);
}
*/

export function validationErrorHandler(req: Request, res: Response, next: NextFunction) {
  // validate
  const errors = validationResult(req).formatWith(errorFormatter);
  if (!errors.isEmpty()) return res.status(422).json(errors.array());

  next();
}

function errorFormatter({ location, msg, param, value, nestedErrors }) {
  // Build your resulting errors however you want! String, object, whatever - it works!
  return msg;
};