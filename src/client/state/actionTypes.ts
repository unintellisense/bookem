import { Action } from 'redux'
import { Book } from '../models/book'

export const enum ActionTypeKeys {
  addBookSuccess,
  addBookSaveFormState,
  viewBookSearchedBooksUpdate
};

export type ActionType =
  { type: ActionTypeKeys.addBookSuccess, book: Book } |
  { type: ActionTypeKeys.addBookSaveFormState, book: Book } |
  { type: ActionTypeKeys.viewBookSearchedBooksUpdate, searchedBooks: Book[], lastRefreshedBooks: number }
