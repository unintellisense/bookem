import { Model, JsonSchema } from 'objection';
import { Required, Property, AllowTypes, Allow } from "@tsed/common";
import { IUser } from '../../shared/dto/iuser';

export default class User extends Model implements IUser {
  @Required()
  firstName: string;

  @Required()
  lastName: string;

  @Required()
  email: string;

  @Required()
  externalIdentifier: string

  @Required()
  externalProvider: string

  @Required()
  creationDate: Date

  @Required()
  lastLogin: Date

  @Required()
  enabled: boolean

  @Required()
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