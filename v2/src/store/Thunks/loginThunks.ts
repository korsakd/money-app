import { AppThunk } from '..';
import { userActions } from '../user';
import { batch } from 'react-redux';
import { categoryActions } from '../category';

export const signInWithEmailAndPassword = (
  email: string,
  password: string,
  signIn: boolean = true,
): AppThunk => async (dispatch, _) => {
  try {
  } catch (err) {
    throw err;
  }
};

export const signOut = (): AppThunk => async dispatch => {
  try {
    batch(() => {
      dispatch(userActions.resetUser());
      dispatch(categoryActions.resetCategory());
    });
  } catch (err) {
    throw err;
  }
};

export const initDB = (userID: string): AppThunk => async (_, getState) => {
  const {
    category: { income, costs },
  } = getState();
};
