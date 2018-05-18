import { Model, JsonSchema } from 'objection';
import IBook from '../model/ibook'
export default class Book extends Model implements IBook {

  title: string
  isFiction: boolean;
  isbn?: string
  authors?: string[]
  description?: string
  location?: string;
  libraryIdentifier?: string;
  bookNumber?: number;
  yearPublished?: number;
  keyWords?: string[];
  category?: string;

  static get tableName() { return 'book'; }

  static jsonSchema: JsonSchema = {
    type: 'object',
    required: ['title'],
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