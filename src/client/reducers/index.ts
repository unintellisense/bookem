import { combineReducers } from 'redux';
import { userReducer, UserState } from './user';
import { ManageState, manageReducer } from './manage'
export interface State {
  user: UserState
  manage: ManageState
};

export const reducers = combineReducers<State>({
  user: userReducer,
  manage: manageReducer
});