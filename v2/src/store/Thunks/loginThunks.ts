import auth from '@react-native-firebase/auth';
import { AppThunk } from '..';

export const signInWithEmailAndPassword = (
  email: string,
  password: string,
): AppThunk => async (dispatch, _) => {
  try {
    const userCredential = await auth().signInWithEmailAndPassword(
      email,
      password,
    );
    const userID = await AsyncStorage.getItem('userID');
    //   if (userID && userID !== userCredential.user.uid) {
    //     await replaceIdToFirebaseUID(userID, userCredential.user.uid, false);
    //   }
    //   batch(() => {
    //     dispatch(
    //       updateUserIdFieldsThunk(
    //         userCredential.user.uid,
    //         userCredential.user.email,
    //       ),
    //     );
    //     dispatch(setStoreOnce(() => {}));
    //     dispatch(setStore(() => {}));
    //   });
  } catch (err) {
    throw err;
  }
};
