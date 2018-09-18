import { IdentityProviderType, UserType } from './iuser'

export interface UserInfo {
  id: string
  email: string
  role?: UserType
  providerType: IdentityProviderType
}
// this must be const enum to be inlined,
// as d.ts does not emit any JS code
export const enum LoginState {
  Unknown,
  LoggedOut,
  LoggedInNoUser,
  LoggedIn
}

export interface AuthState {
  loginState: LoginState
  user?: UserInfo
}

