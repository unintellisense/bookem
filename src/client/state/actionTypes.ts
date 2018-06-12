import { Action } from 'redux'
import { Book } from '../models/book'

export const enum ActionTypeKeys {
  addBookSuccess,
  addBookSaveFormState
};

export type ActionType =
  { type: ActionTypeKeys.addBookSuccess, book: Book } |
  { type: ActionTypeKeys.addBookSaveFormState, book: Book }
