import { Action, Dispatch } from 'redux'
import { ActionTypeKeys } from '../../index'
import { Book } from '../../../models/book'
import { ActionType } from '../../actionTypes'
import { getBooks, deleteBook } from '../../../services/inventoryService'
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

export const updateEditedBookAction = (book: Book) => {
  return async (dispatch: Dispatch<ActionType>): Promise<Action | void> => {
    return dispatch({
      type: ActionTypeKeys.updateEditedBook,
      book
    })
  }
}

export const updateEditedBookPartialCategory = (tag: string) => {
  return async (dispatch: Dispatch<ActionType>): Promise<Action | void> => {
    return dispatch({
      type: ActionTypeKeys.updateEditedBookPartialCategory,
      tag
    })
  }
}

export const deleteBookAction = (book: Book) => {
  return async (dispatch: Dispatch<ActionType>): Promise<Action | void> => {
    if (!book.id) return;
    try {
      await deleteBook(book.id);
      toastSuccess('Book Deleted', `'${book.title}' has been deleted.`);
      return dispatch({
        type: ActionTypeKeys.deletedBook
      })
    } catch (e) {
      // handle nonexistent record
      toastError('failed to delete book', (e.response && e.response.data) ? e.response.data : e.message);
    }
  }
}
