import { Model, JsonSchema } from 'objection';
import { Required, Property,AllowTypes } from "@tsed/common";


export default class Book extends Model {

  @Required()
  title: string
  /** fiction or nonFiction */
  
  @Required()
  isFiction: boolean

  /** ISBN */
  @Property()
  isbn?: string
  
  /** Author */  
  @Property()
  authors?: string[]
  
  /**description of the book */  
  @Property()
  description?: string
  
  /** box #, shelf, etc */
  @Property()
  location?: string
  
  /** local identifier */  
  @Property()
  libraryIdentifier?: string
  
  /** order of book in series */  
  @Property()
  bookNumber?: number
  
  /** year the book was published */
  @Property()
  yearPublished?: number

  /** key word identifiers for this book */
  @Property()
  @AllowTypes('string')
  keyWords?: string[] | null
  
  /**category of this book */
  @Property()
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