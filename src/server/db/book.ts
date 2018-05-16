import { Model, JsonSchema } from 'objection';

export default class Book extends Model {
  isbn?: string
  title: string
  description?: string
  authors?: string

  static get tableName() { return 'book'; }

  static jsonSchema: JsonSchema = {
    type: 'object',
    required: ['title'],
    properties: {
      isbn: { type: 'string' },
      title: { type: 'string' },
      description: { type: 'string' },
      authors: { type: 'string' }
    }
  }

}