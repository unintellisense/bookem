import { Request, Response, NextFunction } from 'express';
import { ValidationError } from 'objection'
export function objectionErrorHandler(err: any, req: Request, res: Response, next: NextFunction) {

  if (isObjectionValidationError(err))
    return res.status(400).json(err.message);

  next();
}

function isObjectionValidationError(err: any): err is ValidationError {
  return err.type &&
    err.type === 'ModelValidation' ||
    err.type === 'RelationExpression' ||
    err.type === 'UnallowedRelation' ||
    err.type === 'InvalidGraph';
}