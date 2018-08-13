import { ThunkDispatch } from 'redux-thunk'
import { ActionTypeKeys, AppState } from '../..'
import { Book } from '../../../models/book'
import { BookSearchDetailOption } from '../../../models/manageBookSearchOption'
import { ActionType } from '../../actionTypes'
import { getBooks, deleteBook, updatePostBook } from '../../../services/inventoryService'
import { toastSuccess, toastError } from '../../../services/toastService'
import { store } from '../../../app'

type Dispatch = ThunkDispatch<AppState, void, ActionType>

export const getSearchedBooksAction = () => {
  return async (dispatch: Dispatch): Promise<ActionType | void> => {
    let { rowsPerPage, selectedPage, searchOptions } = store.getState().manage.viewBook.search;

    var searchedBooks = await getBooks({ page: selectedPage, count: rowsPerPage, searchOptions: searchOptions });
    let action: ActionType = {
      type: ActionTypeKeys.viewBookSearchedBooksUpdate,
      searchedBooks: searchedBooks.data.results,
      searchedBooksCount: searchedBooks.data.total
    };
    return dispatch(action);
  }
}

export const updateLocalEditedBookAction = (book: Book) => {
  return async (dispatch: Dispatch): Promise<ActionType | void> => {
    return dispatch({
      type: ActionTypeKeys.updateEditedBook,
      book
    })
  }
}

export const updateLocalEditedBookPartialCategory = (tag: string) => {
  return async (dispatch: Dispatch): Promise<ActionType | void> => {
    return dispatch({
      type: ActionTypeKeys.updateEditedBookPartialCategory,
      tag
    })
  }
}

export const updateBookAction = (book: Book) => {
  return async (dispatch: Dispatch): Promise<ActionType | void> => {
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
  return async (dispatch: Dispatch): Promise<ActionType | void> => {
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

export const updateviewBookSearchPageSettings = (selectedPage: number, rowsPerPage: number) => {
  return (dispatch: Dispatch) => {
    dispatch({ // tell store about current count/page
      type: ActionTypeKeys.viewBookSearchControlUpdate,
      rowsPerPage: rowsPerPage,
      selectedPage: selectedPage
    });
    dispatch(getSearchedBooksAction()); // update searched book collection
  }
}

export const updateviewBookSearchPanelExpanded = (expanded: boolean) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: ActionTypeKeys.viewBookSearchPanelExpanded,
      panelExpanded: expanded
    })
  }
}

export const updateviewBookSearchOptions = (options: BookSearchDetailOption[]) => {
  return (dispatch: Dispatch) => {
    dispatch({
      type: ActionTypeKeys.viewBookSearchOptionsUpdate,
      searchOptions: options
    })
  }
}
