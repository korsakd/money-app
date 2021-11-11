import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppThunk } from '..';
import { Auth } from 'aws-amplify';
import { userActions } from '../user';

export const signInWithEmailAndPassword = (
  email: string,
  password: string,
): AppThunk => async (dispatch, _) => {
  try {
    const user = await Auth.signIn(email, password);
    // const userID = await AsyncStorage.setItem('userID');
    // dispatch(userActions.setUser(user.attributes.sub));
  } catch (err) {
    throw err;
  }
};

export const signOut = (): AppThunk => async (dispatch, _) => {
  try {
    await Auth.signOut();
    dispatch(userActions.setUser(null));
  } catch (err) {
    throw err;
  }
};
