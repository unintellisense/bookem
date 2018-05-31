import { Action } from 'redux';

export const enum ActionTypeKeys {
  addBookSuccess,
  addBookFailure
};

export type ActionType = 
{type: ActionTypeKeys.addBookSuccess, payload: string } |
{type: ActionTypeKeys.addBookFailure, error: string };



