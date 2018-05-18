import { Model, JsonSchema } from 'objection';
import { Required } from "@tsed/common";
export default class Book extends Model {

  @Required()
  title: string
  /** fiction or nonFiction */
  @Required()
  isFiction: boolean
  /** ISBN */
  isbn?: string
  /** Author */
  authors?: string[]
  /**description of the book */
  description?: string
  /** box #, shelf, etc */
  location?: string
  /** local identifier */
  libraryIdentifier?: string
  /** order of book in series */
  bookNumber?: number
  /** year the book was published */
  yearPublished?: number
  /** key word identifiers for this book */
  keyWords?: string[] | null
  /**category of this book */
  category?: string

  static get tableName() { return 'book'; }

  static jsonSchema: JsonSchema = {
    type: 'object',
    required: ['title', 'isFiction'],
    properties: {
      title: { type: 'string' },
      isbn: { type: 'string' },
      authors: { type: 'string' },
      description: { type: 'string' },
      location: { type: 'string' },
      libraryIdentifier: { type: 'string' },
      bookNumber: { type: 'number' },
      yearPublished: { type: 'number' },
      isFiction: { type: 'boolean' },
      keyWords: {
        type: 'array',
        items: {
          type: 'string'
        }
      },
      category: { type: 'string' },
    }
  }

}