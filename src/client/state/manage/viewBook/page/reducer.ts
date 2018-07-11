import { Reducer } from 'redux'
import { ActionTypeKeys, ActionType } from '../../../actionTypes'
import { Book } from '../../../../models/book'

export interface ViewBookPageState {
  searchedBooks: Book[]
  lastRefreshedBooks: number
}

const defaultViewBookPageState: () => ViewBookPageState = () => ({ searchedBooks: [], lastRefreshedBooks: -1, editedBook: null, editedBookPartialCategory: '' })

export const viewBookPageReducer: Reducer<ViewBookPageState, ActionType> = (state = defaultViewBookPageState(), action) => {

  switch (action.type) {
    case ActionTypeKeys.viewBookSearchedBooksUpdate:
      return { ...state, searchedBooks: action.searchedBooks, lastRefreshedBooks: action.lastRefreshedBooks }
    case ActionTypeKeys.deletedBook:
      // reset searchedBooks and lastRefreshedBooks, the latter will result in the component refreshing the list
      return { ...state, searchedBooks: [], lastRefreshedBooks: -1 }
  }

  return state;
}