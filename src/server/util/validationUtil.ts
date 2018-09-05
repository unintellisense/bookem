import { body, validationResult, Validator, ValidationChain } from 'express-validator/check';

type ValidationArg<F> = F extends (arg: infer U) => any ? U : never

type ValidationCall<F extends keyof Validator> = [F, ValidationArg<Validator[F]>]

let call: ValidationCall<'isLength'> = ['isLength', { min: 1, max: 5 }]

function bodyValidationByType<T>(typeProps: Partial<{ [prop in keyof T]: ValidationCall }>) {

}

body('').isLength({ min: 1, max: 5 })

bodyValidationByType<{ x: string, y: string }>({ max: 5 })