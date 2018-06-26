import { Reducer } from 'redux'
import { ActionTypeKeys, ActionType } from '../../actionTypes'
import { Book } from '../../../models/book'

export interface AddBookState {
  book: Book
  partialCategoryTag: string
}

const defaultAddBookState: () => AddBookState = () => ({ book: Book.GetDefaultBook(), partialCategoryTag: '' });

export const addBookReducer: Reducer<AddBookState, ActionType> = (state = defaultAddBookState(), action) => {

  switch (action.type) {
    case ActionTypeKeys.addBookSuccess:
      return { ...state, book: Book.GetDefaultBook() }

    case ActionTypeKeys.addBookSaveForm:
      return { ...state, book: action.book }

    case ActionTypeKeys.addBookPartialTag:
      return { ...state, partialCategoryTag: action.partial }
  }

  return state;
}