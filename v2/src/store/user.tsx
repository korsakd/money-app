import {
  ImmerReducer,
  createActionCreators,
  createReducerFunction,
} from 'immer-reducer';

export type UserReducerType = {
  userID: string | null;
  firstName: string;
  lastName: string;
  imageUri: string | null;
};

const initialState: UserReducerType = {
  userID: null,
  firstName: '',
  lastName: '',
  imageUri: null,
};

class UserReducer extends ImmerReducer<UserReducerType> {
  state = this.draftState;

  setUser(user: UserReducerType) {
    this.draftState = user;
  }

  setFirstName(name: string) {
    this.draftState.firstName = name;
  }

  resetUser() {
    this.draftState = initialState;
  }
}

export const userActions = createActionCreators(UserReducer);

export const userReducer = createReducerFunction(UserReducer, initialState);
