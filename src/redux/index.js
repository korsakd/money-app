import {createStore} from 'redux';
import categoriesReducer from './reducers/categoriesReducer';
import balanceReducer from './reducers/balanceReducer';
import userReduсer from './reducers/userReduсer';
import Reactotron from '../config/ReactotronConfig';
import {persistStore, persistCombineReducers} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

const config = {
  key: 'money-app',
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2,
};
const store = createStore(
  persistCombineReducers(config, {
    categoriesReducer,
    balanceReducer,
    userReduсer,
  }),
  Reactotron.createEnhancer(),
);

export default () => {
  let persistor = persistStore(store);
  return {store, persistor};
};
