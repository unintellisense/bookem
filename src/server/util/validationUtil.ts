import { body, validationResult, Validator, ValidationChain } from 'express-validator/check';

type ValidationArg<F> = F extends (arg: infer U) => any ? U : never

type ValidationCall<F extends keyof Validator> = [F, ValidationArg<Validator[F]>]

let call1: ValidationCall<'isLength'> = ['isLength', { min: 1, max: '5x' }] // this breaks properly

let call2: ValidationCall<keyof Validator> = ['isLength', { min: 1, max: '5x' }] // this doesnt, cant infer arg?

function bodyValidationByType<T>(typeProps: Partial<{ [prop in keyof T]: ValidationCall<keyof Validator> }>) {

}

body('').isLength({ min: 1, max: 5 })

bodyValidationByType<{ x: string, y: string }>({ x: ['isLength', { shouldntwork: 1 }] }) // but not here???