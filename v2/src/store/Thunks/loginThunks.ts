import { AppThunk } from '..';
import { userActions } from '../user';
import { batch } from 'react-redux';
import { categoryActions } from '../category';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import { NavigationProp } from '@react-navigation/native';
import { MainStackParamList } from '../../Navigation';
import { CategoryType } from '../category';

export const signInWithEmailAndPassword = (
  email: string,
  password: string,
  navigation: NavigationProp<MainStackParamList>,
): AppThunk => async (dispatch, _) => {
  try {
    const { user: authUser } = await auth().signInWithEmailAndPassword(
      email,
      password,
    );
    console.tron({ authUser });
    if (!authUser.emailVerified) {
      console.tron('1');
      await authUser.sendEmailVerification();
      navigation.navigate('SignUp', { emailVerification: true });
      return;
    }
    console.tron('2');
    const userData = await firestore()
      .collection('usersData')
      .doc(authUser.uid)
      .get();
    const { user, costs, income } = userData.data();
    batch(() => {
      dispatch(userActions.setUser(user));
      dispatch(
        categoryActions.setCategoryFromDB(
          Object.values(income),
          Object.values(costs),
        ),
      );
    });
  } catch (err) {
    throw err;
  }
};

export const signUpWithEmailAndPassword = (
  email: string,
  password: string,
): AppThunk => async (dispatch, _) => {
  try {
    await auth().createUserWithEmailAndPassword(email, password);
    const user = await auth().currentUser;
    await user?.sendEmailVerification();
  } catch (err) {
    throw err;
  }
};

export const finishRegistration = (
  firstName: string,
  lastName: string,
  imageUri: string | null,
): AppThunk => async (dispatch, _) => {
  try {
    const user = await auth().currentUser;
    if (user) {
      const { uid } = user;
      let url = '';
      if (imageUri) {
        await storage()
          .ref(`usersPictures/${uid}`)
          .child('picture')
          .putString(imageUri, 'base64', { contentType: 'image/jpg' });
        url = await storage().ref('images/profile-1.png').getDownloadURL();
      }
      const userData = {
        firstName,
        lastName,
        imageUri: url,
        userID: user.uid,
      };
      await firestore()
        .collection('usersForSearch')
        .doc(uid)
        .set({ ...userData });
      await firestore()
        .collection('usersData')
        .doc(uid)
        .set({ user: userData });
      dispatch(initDB(uid));
      dispatch(userActions.setUser(userData));
    }
  } catch (err) {
    throw err;
  }
};

export const signOut = (): AppThunk => async dispatch => {
  try {
    await auth().signOut();
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

  await firestore()
    .collection('usersData')
    .doc(userID)
    .update({ income, costs });
};
