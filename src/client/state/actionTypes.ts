import { Action } from 'redux'
import { Book } from '../models/book'

export const enum ActionTypeKeys {
  addBookSuccess,
  addBookSaveForm,
  addBookPartialTag,
  viewBookSearchedBooksUpdate
};

export type ActionType =
  { type: ActionTypeKeys.addBookSuccess, book: Book } |
  { type: ActionTypeKeys.addBookSaveForm, book: Book } |
  { type: ActionTypeKeys.addBookPartialTag, partial: string } |
  { type: ActionTypeKeys.viewBookSearchedBooksUpdate, searchedBooks: Book[], lastRefreshedBooks: number }
