import { ThunkDispatch } from 'redux-thunk'
import { Action } from 'redux'
import { ActionTypeKeys, AppState } from '../..'
import { ActionType } from '../../actionTypes'
import { Book } from '../../../models/book'
import { postBook } from '../../../services/inventoryService'
import { toastSuccess, toastError } from '../../../services/toastService'
import { getSearchedBooksAction } from '../viewBook/action';
import { apiErrorToText } from '../../../util/ApiErrorUtil'

type Dispatch = ThunkDispatch<AppState, void, ActionType>

export const saveAddBookFieldsAction = (book: Book) => {
  return (dispatch: Dispatch) => {
    return dispatch({
      type: ActionTypeKeys.addBookSaveForm,
      book
    })
  }
}

export const saveAddBookPartialTagAction = (partial: string) => {
  return (dispatch: Dispatch) => {
    return dispatch({
      type: ActionTypeKeys.addBookPartialTag,
      partial
    })
  }
}

export const postBookAction = (book: Book) => {
  return async (dispatch: Dispatch): Promise<Action | void> => {
    try {
      var newBook = await postBook(book);
      toastSuccess('Book added', `'${newBook.data.title}' has been added.`);
      dispatch({ type: ActionTypeKeys.addBookSuccess });
      dispatch(await getSearchedBooksAction());
    } catch (e) { // report error from response.data if response was bad, otherwise whatever we caught (timeout?)
      toastError('failed to add book',
        apiErrorToText(e));
    }
  };
};