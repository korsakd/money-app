import React, { useEffect } from 'react';
import { View, Text, Pressable } from 'react-native';
import { useColorScheme } from 'react-native-appearance';
import { getCurrentTheme } from '../Theme';
import algoliasearch from 'algoliasearch';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { initDB } from '../store/Thunks/loginThunks';
import { useNetInfo } from '@react-native-community/netinfo';
import { userActions } from '../store/user';

const HomeScreen = () => {
  const scheme = useColorScheme();
  const { colors } = getCurrentTheme(scheme);
  const {
    user: { firstName },
    category: { income, costs },
  } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const netInfo = useNetInfo();
  const userID = 'iQ5hdBDJcgPPOKjDEt0pQQo5BCr2';
  // useEffect(() => {
  //   const subscriber = auth().onAuthStateChanged(user => {
  //     if (user && !user.emailVerified) {
  //       auth().signOut();
  //     }
  //   });
  //   return subscriber; // unsubscribe on unmount
  // }, []);
  // useEffect(() => {
  //   const search = async () => {
  //     const client = algoliasearch('GL2UGLVWW6', Config.ALGOLIA_API_KEY);
  //     const index = client.initIndex('users');
  //     const result = (await index.search(state)).hits;

  //   };
  //   if (state) {
  //     search();
  //   }
  // }, [state]);

  // const send = async () => {
  //   const userData = {
  //     firstName: 'name',
  //     lastName: 'last',
  //     imageUri: '',
  //     userID: '1234',
  //   };

  //   await firestore()
  //     .collection('usersData')
  //     .doc('1234')
  //     .update({ user: userData });
  // };

  useEffect(() => {
    const get = async () => {
      await firestore()
        .collection('usersData')
        .doc(userID)
        .onSnapshot(doc => {
          const data = doc.data();
          console.tron({ doc: data, time: Date.now() });
          dispatch(userActions.setFirstName(data.user.firstName));
        });
    };
    console.tron({ userID });
    if (userID) {
      get();
    }
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.background,
      }}>
      <Text style={{ color: 'red' }}>
        {netInfo.isConnected ? 'connected' : 'ne connected'}
      </Text>
      <Text style={{ color: 'cyan' }}>{firstName}</Text>
      <Pressable
        onPress={async () => {
          // auth().signOut();
          await firestore()
            .collection('usersData')
            .doc(userID)
            .update({ 'user.firstName': 'Dima' });
          console.tron({ time: Date.now() });
        }}>
        <Text style={{ color: colors.text }}>HomeScreen</Text>
      </Pressable>
    </View>
  );
};

export default HomeScreen;
