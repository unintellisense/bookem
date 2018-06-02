import { Action } from 'redux';
import { IBook } from '../../shared/dto/ibook'
export const enum ActionTypeKeys {
  addBookSuccess,
  addBookFailure,
  addBookClearAlert,
  addBookSaveFormState
};

export type ActionType =
  { type: ActionTypeKeys.addBookSuccess, book: IBook } |
  { type: ActionTypeKeys.addBookFailure, error: string } |
  { type: ActionTypeKeys.addBookClearAlert } |
  { type: ActionTypeKeys.addBookSaveFormState, book: IBook }

