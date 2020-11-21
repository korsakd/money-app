import {
  Action,
  combineReducers,
  applyMiddleware,
  createStore,
  compose,
} from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import Reactotron from './ReactotronConfig';
import thunk from 'redux-thunk';

export type RootState = {};
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export type MyThunkDispatch = ThunkDispatch<RootState, unknown, Action>;

const appReducer = combineReducers({});

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
