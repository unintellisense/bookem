import { RequestHandler } from 'express'
import { Model, JsonSchema } from 'objection';
import { oneOf, body } from 'express-validator/check';
import { IBook } from '../../shared/dto/ibook'

export const BookValidations: RequestHandler[] = [
  body('title', 'Enter a valid title.').isString().not().isEmpty(),
  body('isFiction', 'isFiction must be boolean.').isBoolean(),

  body('categories','categories must be array.').isArray().optional(),
  body('categories.*','categories values must be strings.').isString(),

  body('isbn').isString().optional(),
  body('authors').isString().optional(),
  body('description').isString().optional(),
  body('libraryIdentifier').isString().optional(),
  body('isbn').isString().optional(),

  oneOf([
    body('bookSeriesNumber').isInt(),
    body('bookSeriesNumber').isEmpty()
  ]),

  oneOf([
    body('yearPublished').isInt().optional(),
    body('yearPublished').isEmpty()
  ])
]

export class Book extends Model implements IBook {

  title: string
  /** fiction or nonFiction */
  isFiction: boolean

  /** ISBN */
  isbn: string

  /** Author */
  authors: string

  /**description of the book */
  description: string

  /** local identifier */
  libraryIdentifier: string

  /** order of book in series */
  bookSeriesNumber: number | null

  /** year the book was published */
  yearPublished: number | null

  /**category of this book */
  categories: string[]

  static get tableName() { return 'book'; }

  static fromDatabaseJson = (row) => {
    return { ...row, isFiction: !!row.isFiction, categories: JSON.parse(row.categories) || [] };
  }

  static jsonSchema: JsonSchema = {
    type: 'object',
    required: ['title', 'isFiction'],
    properties: {
      title: { type: 'string' },
      isFiction: { type: 'boolean' },
      isbn: { type: 'string' },
      authors: { type: 'string' },
      description: { type: 'string' },
      libraryIdentifier: { type: 'string' },
      bookSeriesNumber: { type: ['number', 'null'], },
      yearPublished: { type: ['number', 'null'] },
      categories: {
        type: 'array',
        items: {
          type: 'string'
        }
      }
    }
  }

}