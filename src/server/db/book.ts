import { Model, JsonSchema } from 'objection';
import { Required, Property, AllowTypes } from "@tsed/common";
import { IBook } from '../../shared/dto/ibook'

export default class Book extends Model implements IBook {

  @Required()
  title: string
  /** fiction or nonFiction */

  @Required()
  isFiction: boolean

  /** ISBN */
  @Property()
  isbn: string

  /** Author */
  @Property()
  authors?: string[]

  /**description of the book */
  @Property()
  description: string

  /** local identifier */
  @Property()
  libraryIdentifier?: string

  /** order of book in series */
  @Property()
  bookSeriesNumber?: number

  /** year the book was published */
  @Property()
  yearPublished?: number

  /**category of this book */
  @Property()
  @AllowTypes('string')
  category?: string[]

  static get tableName() { return 'book'; }

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
      bookSeriesNumber: { type: 'number' },
      yearPublished: { type: 'number' },
      category: {
        type: 'array',
        items: {
          type: 'string'
        }
      }
    }
  }

}