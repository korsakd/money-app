import {
  ImmerReducer,
  createActionCreators,
  createReducerFunction,
} from 'immer-reducer';

export type UserReducerType = {
  userId: string | null;
  firstName: string;
  secondName: string;
  imageUri: string | null;
};

const initialState: UserReducerType = {
  userId: null,
  firstName: '',
  secondName: '',
  imageUri: null,
};

class UserReducer extends ImmerReducer<UserReducerType> {
  state = this.draftState;

  setUser(user: UserReducerType) {
    this.state = user;
  }
}

export const userActions = createActionCreators(UserReducer);

export const userReducer = createReducerFunction(UserReducer, initialState);
