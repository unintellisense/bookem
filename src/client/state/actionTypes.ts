import { Action } from 'redux'
import { Book } from '../models/book'

export const enum ActionTypeKeys {
  addBookSuccess,
  addBookSaveForm,
  addBookPartialTag,
  updateEditedBook,
  updateEditedBookPartialCategory,
  resetEditedBook,
  deleteBook,
  viewBookSearchedBooksUpdate
};

export type ActionType =
  { type: ActionTypeKeys.addBookSuccess, book: Book } |
  { type: ActionTypeKeys.addBookSaveForm, book: Book } |
  { type: ActionTypeKeys.addBookPartialTag, partial: string } |
  { type: ActionTypeKeys.updateEditedBook, book: Book } |
  { type: ActionTypeKeys.updateEditedBookPartialCategory, tag: string } |
  { type: ActionTypeKeys.resetEditedBook } |
  { type: ActionTypeKeys.deleteBook } |
  { type: ActionTypeKeys.viewBookSearchedBooksUpdate, searchedBooks: Book[], lastRefreshedBooks: number }
