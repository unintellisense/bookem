import { body } from 'express-validator/check';
// keep for now, but delete if unused
type GetArgs<F extends Function> = F extends (...args: infer A) => any ? A : never;

type BodyArgs = GetArgs<typeof body>
type BodyArgsForType<T> = BodyArgs[0] & keyof T

export function bodyValidationForType<T>(field: BodyArgsForType<T>) {
  return body(field);
}

bodyValidationForType<{ a: string }>('a')
