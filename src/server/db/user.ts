import { Model, JsonSchema } from 'objection';
import { IUser } from '../../shared/dto/iuser';

export default class User extends Model implements IUser {
  
  firstName: string;

  lastName: string;

  email: string;

  externalIdentifier: string

  externalProvider: string

  creationDate: Date

  lastLogin: Date

  enabled: boolean

  type: 'user' | 'admin'

  static get tableName() { return 'user'; }

  static fromDatabaseJson = (row) => {
    return { ...row, enabled: !!row.enabled };
  }

  static jsonSchema: JsonSchema = {
    type: 'object',
    required: ['firstName', 'lastName', 'email'],
    properties: {
      firstName: { type: 'string' },
      lastName: { type: 'string' },
      email: { type: 'string' },

      externalIdentifier: { type: 'string' },
      externalProvider: { type: 'string' },

      creationDate: { type: 'date' },
      lastLogin: { type: 'date' },

      enabled: { type: 'boolean' },
      type: { type: 'boolean', enum: ['user', 'admin'] },
    }
  }
}