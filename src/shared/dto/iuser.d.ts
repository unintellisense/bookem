export const enum IdentityProviderType {
  Google = "google"
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
  externalProvider: IdentityProviderType
  type: UserType
}


export interface IUser extends UserSelfModifiable, UserRestrictedModifiable { }

