import {
  ImmerReducer,
  createActionCreators,
  createReducerFunction,
} from 'immer-reducer';

export type UserReducerType = {
  user: any;
  userId: string | null;
};

const initialState: UserReducerType = {
  user: null,
  userId: null,
};

class UserReducer extends ImmerReducer<UserReducerType> {
  state = this.draftState;
}

export const userActions = createActionCreators(UserReducer);

export const userReducer = createReducerFunction(UserReducer, initialState);
