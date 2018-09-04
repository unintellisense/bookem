import { Model, JsonSchema } from 'objection';
import { Required, Property, AllowTypes, Allow } from "@tsed/common";
import { body, validationResult, ValidationChain, ValidationChainBuilder } from 'express-validator/check';
import { IBook } from '../../shared/dto/ibook'

type BookBody = typeof body &
{ (bookProp: keyof IBook): ValidationChainBuilder }


export const validations: BookValidationChain[] = [
  body('title').isString(),
  //body('isFiction').isBoolean(),
  //body('isbn')
]

export class Book extends Model implements IBook {



  @Required()
  title: string

  /** fiction or nonFiction */
  @Required()
  isFiction: boolean

  /** ISBN */
  @Property()
  @Allow(null)
  isbn: string

  /** Author */
  @Property()
  @Allow(null)
  authors: string

  /**description of the book */
  @Property()
  @Allow(null)
  description: string

  /** local identifier */
  @Property()
  @Allow(null)
  libraryIdentifier: string

  /** order of book in series */
  @Property()
  @Allow(null)
  bookSeriesNumber: number | null

  /** year the book was published */
  @Property()
  @Allow(null)
  yearPublished: number | null

  /**category of this book */
  @Property()
  @AllowTypes('string')
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