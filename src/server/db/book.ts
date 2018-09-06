import { Model, JsonSchema } from 'objection';
import { body, ValidationChain } from 'express-validator/check';
import { IBook } from '../../shared/dto/ibook'

export const BookValidations: ValidationChain[] = [
  body('title').isString(),
  body('isFiction').isBoolean(),

  body('categories').isArray(),
  body('categories.*').isString(),

  body('isbn').isString().optional(),
  body('authors').isString().optional(),
  body('description').isString().optional(),
  body('libraryIdentifier').isString().optional(),

  body('isbn').isString().optional(),
  body('bookSeriesNumber').isNumeric().optional(),
  body('yearPublished').isNumeric().optional()
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
      authors: {
        type: 'array',
        items: {
          type: 'string'
        }
      },
      description: { type: 'string' },
      libraryIdentifier: { type: 'string' },
      bookSeriesNumber: { type: ['number'] },
      yearPublished: { type: 'number' },
      categories: {
        type: 'array',
        items: {
          type: 'string'
        }
      }
    }
  }

}