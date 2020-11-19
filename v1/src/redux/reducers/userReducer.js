import {
  ImmerReducer,
  createActionCreators,
  createReducerFunction,
} from 'immer-reducer';

const initialState = {
  user: null,
};

class UserReducer extends ImmerReducer {
  state = this.draftState;
}

export const userActions = createActionCreators(UserReducer);

export const userReducer = createReducerFunction(UserReducer, initialState);

// const ON_AUTH_STATE_CHANGED = 'ON_AUTH_STATE_CHANGED';

// export const setUser = user => ({
//   type: ON_AUTH_STATE_CHANGED,
//   payload: user,
// });

// export default function userReducer(state = initialsate, action) {
//   switch (action.type) {
//     case ON_AUTH_STATE_CHANGED:
//       return {
//         user: action.payload,
//       };
//     default:
//       return state;
//   }
// }
