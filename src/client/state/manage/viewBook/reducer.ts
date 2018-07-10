import { Reducer } from 'redux'
import { ActionTypeKeys, ActionType } from '../../actionTypes'
import { Book } from '../../../models/book'

export interface ViewBookState {
  searchedBooks: Book[]
  editedBook: Book | null
  editedBookPartialCategory: string
  lastRefreshedBooks: number
}

const defaultViewBookState: () => ViewBookState = () => ({ searchedBooks: [], lastRefreshedBooks: -1, editedBook: null, editedBookPartialCategory: '' })

export const viewBookReducer: Reducer<ViewBookState, ActionType> = (state = defaultViewBookState(), action) => {

  switch (action.type) {
    case ActionTypeKeys.viewBookSearchedBooksUpdate:
      return { ...state, searchedBooks: action.searchedBooks, lastRefreshedBooks: action.lastRefreshedBooks }
    case ActionTypeKeys.updateEditedBook:
      return { ...state, editedBook: action.book }
    case ActionTypeKeys.resetEditedBook:
      return { ...state, editedBook: null, editedBookPartialCategory: '' }
    case ActionTypeKeys.deleteBook:
      // reset searchedBooks and lastRefreshedBooks, the latter will result in the component refreshing the list
      return { ...state, searchedBooks: [], lastRefreshedBooks: -1, editedBook: null, editedBookPartialCategory: '' }
    case ActionTypeKeys.updateEditedBookPartialCategory:
      return { ...state, editedBookPartialCategory: action.tag }
  }

  return state;
}