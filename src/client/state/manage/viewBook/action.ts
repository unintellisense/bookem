import { Action, Dispatch, AnyAction } from 'redux'
import { ActionTypeKeys } from '../../index'
import { Book } from '../../../models/book'
import { ActionType } from '../../actionTypes'
import { getBooks, deleteBook, updatePostBook } from '../../../services/inventoryService'
import { toastSuccess, toastError } from '../../../services/toastService'

export const getSearchedBooksAction = () => {
  return async (dispatch: Dispatch): Promise<ActionType | void> => {
    var searchedBooks = await getBooks();
    let action: ActionType = {
      type: ActionTypeKeys.viewBookSearchedBooksUpdate,
      searchedBooks: searchedBooks.data.results,
      lastRefreshedBooks: Date.now()
    };
    return dispatch(action);
  }
}

export const updateLocalEditedBookAction = (book: Book) => {
  return async (dispatch: Dispatch<ActionType>): Promise<ActionType | void> => {
    return dispatch({
      type: ActionTypeKeys.updateEditedBook,
      book
    })
  }
}

export const updateLocalEditedBookPartialCategory = (tag: string) => {
  return async (dispatch: Dispatch<ActionType>): Promise<ActionType | void> => {
    return dispatch({
      type: ActionTypeKeys.updateEditedBookPartialCategory,
      tag
    })
  }
}

export const updateBookAction = (book: Book) => {
  return async (dispatch: Dispatch<ActionType>): Promise<ActionType | void> => {
    if (!book.id) return;
    try {
      await updatePostBook(book);
      toastSuccess('Book Updated', `'${book.title}' has been updated.`);
      return dispatch({
        type: ActionTypeKeys.resetViewBook
      })
    } catch (e) {
      // handle nonexistent record
      toastError('failed to update book', (e.response && e.response.data) ? e.response.data : e.message);
    }
  }
}

export const deleteBookAction = (book: Book) => {
  return async (dispatch: Dispatch<ActionType>): Promise<ActionType | void> => {
    if (!book.id) return;
    try {
      await deleteBook(book.id);
      toastSuccess('Book Deleted', `'${book.title}' has been deleted.`);
      return dispatch({
        type: ActionTypeKeys.resetViewBook
      })
    } catch (e) {
      // handle nonexistent record
      toastError('failed to delete book', (e.response && e.response.data) ? e.response.data : e.message);
    }
  }
}
