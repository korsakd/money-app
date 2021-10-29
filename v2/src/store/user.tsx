import {
  ImmerReducer,
  createActionCreators,
  createReducerFunction,
} from 'immer-reducer';

export type UserReducerType = {
  userId: string | null;
};

const initialState: UserReducerType = {
  userId: null,
};

class UserReducer extends ImmerReducer<UserReducerType> {
  state = this.draftState;

  setUser(userId: string | null) {
    this.state.userId = userId;
  }
}

export const userActions = createActionCreators(UserReducer);

export const userReducer = createReducerFunction(UserReducer, initialState);
