import { Reducer } from 'redux'
import { ActionTypeKeys, ActionType } from '../actionTypes'
import { AuthState } from '../../../shared/dto/auth'

const defaultAuthState: () => AuthState = () => ({ loggedin: false });

export const authReducer: Reducer<AuthState, ActionType> = (state = defaultAuthState(), action) => {

  if (action.type == ActionTypeKeys.authState) {
    return action.authState;
  }

  return state;
}