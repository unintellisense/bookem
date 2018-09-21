import { ThunkDispatch } from 'redux-thunk'
import { ActionTypeKeys, AppState } from '../'
import { ActionType } from '../actionTypes'
import { updateAuthStateAction } from '../auth'
import { UserSelfModifiable } from '../../../shared/dto/iuser'
import { createUser } from '../../services/userService'
import { toastError, toastSuccess } from '../../services/toastService';
import { apiErrorToText } from '../../util/ApiErrorUtil';

type Dispatch = ThunkDispatch<AppState, void, ActionType>

export const createUserAction = (payload: UserSelfModifiable) => {
  return async (dispatch: Dispatch) => {
    try {
      await createUser(payload);
      dispatch(await updateAuthStateAction());
      toastSuccess('User created', 'Thank you for completing the sign-up process.');
    } catch (e) {
      toastError('failed to create user', apiErrorToText(e));
    }
  }
}