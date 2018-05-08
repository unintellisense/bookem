import { Action, Reducer } from 'redux';

export interface UserState {
  username: string | null;
}

const defaultUserState: () => UserState = () => ({ username: null });

export const userReducer: Reducer<UserState, Action<string>> = (state = defaultUserState(), action) => {
  // Later on we will have a switch statement to replace state on changes. might want to change action generic type to a enum of actions
  return state;
}