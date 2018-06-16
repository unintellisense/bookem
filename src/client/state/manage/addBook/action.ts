import { Action, Dispatch } from 'redux'
import { ActionTypeKeys } from '../../index'
import { Book } from '../../../models/book'
import { postBook } from '../../../services/inventoryService'
import { toastSuccess, toastError } from '../../../services/toastService'

const alertMessageLengthMillis = 3000;

export const saveAddBookFieldsAction = (book: Book) => {
  return (dispatch: Dispatch) => {
    return dispatch({
      type: ActionTypeKeys.addBookSaveFormState,
      book
    })
  }
}

export const postBookAction = (book: Book) => {
  return async (dispatch: Dispatch): Promise<Action | void> => {
    try {
      var newBook = await postBook(book);
      toastSuccess('Book added', `'${newBook.data.title}' has been added.`);
      return dispatch({
        type: ActionTypeKeys.addBookSuccess,
        book: newBook.data
      });
    } catch (e) { // report error from response.data if response was bad, otherwise whatever we caught (timeout?)
      toastError('failed to add book', (e.response && e.response.data) ? e.response.data : e.message);
    }
  };
};