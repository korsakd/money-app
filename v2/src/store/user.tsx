import {
  ImmerReducer,
  createActionCreators,
  createReducerFunction,
} from 'immer-reducer';

export type UserReducerType = {
  userID: string | null;
  firstName: string;
  secondName: string;
  imageUri: string | null;
};

const initialState: UserReducerType = {
  userID: null,
  firstName: '',
  secondName: '',
  imageUri: null,
};

class UserReducer extends ImmerReducer<UserReducerType> {
  state = this.draftState;

  setUser(user: UserReducerType) {
    console.tron({ user });
    this.draftState = user;
  }

  resetUser() {
    this.draftState = initialState;
  }
}

export const userActions = createActionCreators(UserReducer);

export const userReducer = createReducerFunction(UserReducer, initialState);
