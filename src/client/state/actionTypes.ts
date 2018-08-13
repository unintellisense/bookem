import { BookSearchDetailOption } from '../models/manageBookSearchOption'
import { Book } from '../models/book'

export const enum ActionTypeKeys {
  /** addBook related */
  addBookSuccess,
  addBookSaveForm,
  addBookPartialTag,
  /** viewBook modal related */
  updateEditedBook,
  updateEditedBookPartialCategory,
  resetEditedBook,
  /** viewBook page related */
  viewBookSearchedBooksUpdate,
  /** related to modal and page, as we clear modal state and reset page */
  resetViewBook,
  viewBookSearchControlUpdate,
  viewBookSearchPanelExpanded,
  viewBookSearchOptionsUpdate
};

export type ActionType =
  { type: ActionTypeKeys.addBookSuccess, book: Book } |
  { type: ActionTypeKeys.addBookSaveForm, book: Book } |
  { type: ActionTypeKeys.addBookPartialTag, partial: string } |
  { type: ActionTypeKeys.updateEditedBook, book: Book } |
  { type: ActionTypeKeys.updateEditedBookPartialCategory, tag: string } |
  { type: ActionTypeKeys.resetEditedBook } |
  { type: ActionTypeKeys.viewBookSearchedBooksUpdate, searchedBooks: Book[], searchedBooksCount: number } |
  { type: ActionTypeKeys.resetViewBook } |
  { type: ActionTypeKeys.viewBookSearchControlUpdate, rowsPerPage: number, selectedPage: number } |
  { type: ActionTypeKeys.viewBookSearchPanelExpanded, panelExpanded: boolean } |
  { type: ActionTypeKeys.viewBookSearchOptionsUpdate, searchOptions: BookSearchDetailOption[] }

