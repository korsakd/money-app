import {
  Action,
  combineReducers,
  applyMiddleware,
  createStore,
  compose,
  CombinedState,
  Reducer,
  AnyAction,
} from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { userReducer, UserReducerType } from './user';
import Reactotron from './ReactotronConfig';
import thunk from 'redux-thunk';

export type RootState = {
  user: UserReducerType;
};
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export type MyThunkDispatch = ThunkDispatch<RootState, unknown, Action>;

// TODO: types for combineReducers
const appReducer = combineReducers({
  user: userReducer,
});

export default function configureStore() {
  let store;
  if (Reactotron.createEnhancer) {
    store = createStore(
      appReducer,
      compose(applyMiddleware(thunk), Reactotron.createEnhancer()),
    );
  } else {
    store = createStore(appReducer, applyMiddleware(thunk));
  }
  return { store };
}
