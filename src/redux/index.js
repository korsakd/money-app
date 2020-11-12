import { createStore, applyMiddleware, compose } from 'redux';
import { categoriesReducer } from './reducers/categoriesReducer';
import balanceReducer from './reducers/balanceReducer';
import userReducer from './reducers/userReducer';
import currencyReducer from './reducers/currencyReducer';
import Reactotron from '../config/ReactotronConfig';
import { persistStore, persistCombineReducers } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import thunk from 'redux-thunk';

const config = {
  key: 'money-app',
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2,
};
const store = createStore(
  persistCombineReducers(config, {
    categoriesReducer,
    balanceReducer,
    userReducer,
    currencyReducer,
  }),
  compose(
    applyMiddleware(thunk),
    Reactotron.createEnhancer(),
  ),
);

export default () => {
  let persistor = persistStore(store);
  return { store, persistor };
};
