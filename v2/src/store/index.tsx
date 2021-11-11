import {
  Action,
  combineReducers,
  applyMiddleware,
  createStore,
  compose,
} from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { userReducer, UserReducerType } from './user';
import Reactotron from './ReactotronConfig';
import thunk from 'redux-thunk';
import { categoryReducer, CategoryReducerType } from './category';
import AsyncStorage from '@react-native-async-storage/async-storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

export type RootState = {
  user: UserReducerType;
  category: CategoryReducerType;
};
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export type MyThunkDispatch = ThunkDispatch<RootState, unknown, Action>;

const userPersistConfig = {
  key: 'user',
  storage: AsyncStorage,
};

const categoryPersistConfig = {
  key: 'category',
  storage: AsyncStorage,
};

// TODO: types for combineReducers
const appReducer = combineReducers({
  user: persistReducer(userPersistConfig, userReducer),
  category: persistReducer(categoryPersistConfig, categoryReducer),
});

export default function configureStore() {
  let store;
  let persistor;
  if (Reactotron.createEnhancer) {
    store = createStore(
      appReducer,
      compose(applyMiddleware(thunk), Reactotron.createEnhancer()),
    );
    persistor = persistStore(store);
  } else {
    store = createStore(appReducer, applyMiddleware(thunk));
    persistor = persistStore(store);
  }
  return { store, persistor };
}
