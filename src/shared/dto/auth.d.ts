export interface UserInfo {
  id: number
  role: string
}

export interface AuthState {
  loggedin: boolean
  user?: UserInfo
}

