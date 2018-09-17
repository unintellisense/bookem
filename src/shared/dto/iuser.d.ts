export enum UserProviderType {
  Google = 1
}

export type UserType = 'user' | 'admin'

// fields modifiable by the user
export interface UserSelfModifiable {
  firstName: string
  lastName: string

}

// fields modifiable by system/admin
export interface UserRestrictedModifiable {
  email: string

  creationDate: Date
  lastLogin: Date
  enabled: boolean

  externalIdentifier: string
  externalProvider: UserProviderType
  type: UserType
}


export interface IUser extends UserSelfModifiable, UserRestrictedModifiable { }

