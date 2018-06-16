import { Action, Dispatch } from 'redux'
import { ActionTypeKeys } from '../../index'
import { Book } from '../../../models/book'
import { getBooks } from '../../../services/inventoryService'
import { toastSuccess, toastError } from '../../../services/toastService'

export const getSearchedBooksAction = () => {
  return async (dispatch: Dispatch): Promise<Action | void> => {
    var searchedBooks = await getBooks();
    return dispatch({
      type: ActionTypeKeys.viewBookSearchedBooksUpdate,
      searchedBooks: searchedBooks.data,
      lastRefreshedBooks: Date.now()
    })
  }
}
