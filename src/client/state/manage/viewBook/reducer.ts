import { Reducer } from 'redux'
import { ActionTypeKeys, ActionType } from '../../actionTypes'
import { Book } from '../../../models/book'

export interface ViewBookState {
  searchedBooks: Book[]
  lastRefreshedBooks: number
}

const defaultViewBookState: () => ViewBookState = () => ({ searchedBooks: [], lastRefreshedBooks: -1 })

export const viewBookReducer: Reducer<ViewBookState, ActionType> = (state = defaultViewBookState(), action) => {

  switch (action.type) {
    case ActionTypeKeys.viewBookSearchedBooksUpdate:
      return { searchedBooks: action.searchedBooks, lastRefreshedBooks: action.lastRefreshedBooks }
  }

  return state;
}