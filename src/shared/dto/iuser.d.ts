export enum UserProviderType {
  Google = 1
}

export type UserType = 'user' | 'admin'

// fields modifiable by the user
export interface UserDTO {
  firstName: string
  lastName: string
  email: string

  creationDate: Date
  lastLogin: Date
  enabled: boolean
}

export interface UserDAO {
  externalIdentifier: string
  externalProvider: UserProviderType
  type: UserType
}

export interface IUser extends UserDTO, UserDAO { }

