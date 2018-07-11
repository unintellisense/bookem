import { combineReducers } from 'redux';
import { userReducer, UserState } from './user';
import { ManageState, manageReducers } from './manage'
export { ActionTypeKeys } from './actionTypes'
import { reducer as toastrReducer, ToastrState } from 'react-redux-toastr';

export interface AppState {
  user: UserState
  manage: ManageState
  toastr: any
};

export const appReducers = combineReducers<AppState>({
  user: userReducer,
  manage: manageReducers,
  toastr: toastrReducer
});