import { ThunkDispatch } from 'redux-thunk'
import { ActionTypeKeys, AppState } from '../'
import { ActionType } from '../actionTypes'
import { getAuthState } from '../../services/authService'

type Dispatch = ThunkDispatch<AppState, void, ActionType>

export const updateAuthStateAction = () => {
  return async (dispatch: Dispatch) => {
    let result = await getAuthState();
    
    return dispatch({
      type: ActionTypeKeys.authState,
      authState: result.data
    });
  }
}