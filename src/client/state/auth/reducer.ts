import { Reducer } from 'redux'
import { ActionTypeKeys, ActionType } from '../actionTypes'
import { AuthState, LoginState } from '../../../shared/dto/auth'

const defaultAuthState: () => AuthState = () => ({ loginState: LoginState.Unknown });

export const authReducer: Reducer<AuthState, ActionType> = (state = defaultAuthState(), action) => {

  if (action.type == ActionTypeKeys.authState) {
    return action.authState;
  }

  return state;
}