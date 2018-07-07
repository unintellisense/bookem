import { Action } from 'redux'
import { Book } from '../models/book'

export const enum ActionTypeKeys {
  addBookSuccess,
  addBookSaveForm,
  addBookPartialTag,
  updateEditedBook,
  deleteBook,
  viewBookSearchedBooksUpdate
};

export type ActionType =
  { type: ActionTypeKeys.addBookSuccess, book: Book } |
  { type: ActionTypeKeys.addBookSaveForm, book: Book } |
  { type: ActionTypeKeys.addBookPartialTag, partial: string } |
  { type: ActionTypeKeys.updateEditedBook, book: Book } |
  { type: ActionTypeKeys.deleteBook } |
  { type: ActionTypeKeys.viewBookSearchedBooksUpdate, searchedBooks: Book[], lastRefreshedBooks: number }
