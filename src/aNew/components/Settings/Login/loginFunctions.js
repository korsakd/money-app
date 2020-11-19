import { NativeModules } from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import { GoogleSignin } from '@react-native-community/google-signin';

const { RNTwitterSignIn } = NativeModules;
const Constants = {
  TWITTER_COMSUMER_KEY: 'UUT9jxeR53i04u4fsH0m5vCEs',
  TWITTER_CONSUMER_SECRET: 'A28bBUTA9ikavHEPmxiY0Yyq4GfmoytPzxrFtQExl5JwWegaXE',
};

export const facebookSignIn = async () => {
  const loginResult = await LoginManager.logInWithPermissions([
    'public_profile',
    'email',
  ]);
  console.tron({ facebookLoginData: loginResult });
  if (!loginResult.isCancelled) {
    const loginData = await AccessToken.getCurrentAccessToken();
    if (loginData) {
      const credential = auth.FacebookAuthProvider.credential(
        loginData.accessToken,
      );
      const currentUser = await auth().signInWithCredential(credential);
      let dataSnapshot = await database()
        .ref(`users/${currentUser.user.uid}`)
        .once('value');
      dataSnapshot = dataSnapshot.toJSON();
      console.tron({ facebookSnapShot: dataSnapshot });
    }
  }
};

export const twitterSignIn = async () => {
  RNTwitterSignIn.init(
    Constants.TWITTER_COMSUMER_KEY,
    Constants.TWITTER_CONSUMER_SECRET,
  );
  const loginData = await RNTwitterSignIn.logIn();
  console.tron({ twitterLoginData: loginData });
  if (loginData) {
    const credential = auth.TwitterAuthProvider.credential(
      loginData.authToken,
      loginData.authTokenSecret,
    );
    const currentUser = await auth().signInWithCredential(credential);
    const dataSnapshot = (await database()
      .ref(`users/${currentUser.user.uid}`)
      .once('value')).toJSON();
    console.tron({ twitterSnapShot: dataSnapshot });
  }
};

export const googleSignIn = async () => {
  GoogleSignin.configure({
    webClientId:
      '837029674653-bao41219mm1v6bghpdavemchjscc4ipq.apps.googleusercontent.com',
  });

  await GoogleSignin.hasPlayServices();
  const loginData = await GoogleSignin.signIn();
  console.tron({ googleLoginData: loginData });
  const credential = auth.GoogleAuthProvider.credential(loginData.idToken);
  const currentUser = await auth().signInWithCredential(credential);
  const dataSnapShot = (await database()
    .ref(`users/${currentUser.user.uid}`)
    .once('value')).toJSON();
  console.tron({ googleSnapShot: dataSnapShot });
};

// if (dataSnapshot.toJSON()) {
//     importUserDataFromDB(
//       dataSnapshot,
//       addBalanceFromDb,
//       addCategoryFromDb,
//     );
//   } else {
//     const currentUser = await auth().currentUser;
//     writeUserData(
//       currentUser,
//       incomeCategory,
//       costsCategory,
//       balance,
//       database,
//       deviceId,
//     );
//   }
