import { Reducer } from 'redux'
import { ActionTypeKeys, ActionType } from '../../actionTypes'
import { Book } from '../../../models/book'

export interface ViewBookState {
  searchedBooks: Book[]
  editedBook?: Book
  lastRefreshedBooks: number
}

const defaultViewBookState: () => ViewBookState = () => ({ searchedBooks: [], lastRefreshedBooks: -1 })

export const viewBookReducer: Reducer<ViewBookState, ActionType> = (state = defaultViewBookState(), action) => {

  switch (action.type) {
    case ActionTypeKeys.viewBookSearchedBooksUpdate:
      return { ...state, searchedBooks: action.searchedBooks, lastRefreshedBooks: action.lastRefreshedBooks }
    case ActionTypeKeys.updateEditedBook:
      return { ...state, editedBook: action.book }
    case ActionTypeKeys.deleteBook:
      // reset searchedBooks and lastRefreshedBooks, the latter will result in the component refreshing the list
      return { searchedBooks: [], lastRefreshedBooks: -1 }
  }

  return state;
}