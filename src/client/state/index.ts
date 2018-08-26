import { combineReducers } from 'redux';
import { ManageState, manageReducers } from './manage'
import { authReducer, } from './auth'
export { ActionTypeKeys } from './actionTypes'
import { reducer as toastrReducer, ToastrState } from 'react-redux-toastr';
import { AuthState } from '../../shared/dto/auth'
export interface AppState {  
  manage: ManageState
  toastr: any
  auth: AuthState
};

export const appReducers = combineReducers<AppState>({  
  manage: manageReducers,
  toastr: toastrReducer,
  auth: authReducer
});