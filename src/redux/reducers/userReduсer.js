const initialsate = {
  user: null,
};

const ON_AUTH_STATE_CHANGED = 'ON_AUTH_STATE_CHANGED';

export const setUser = user => ({
  type: ON_AUTH_STATE_CHANGED,
  payload: user,
});

export default function userReduсer(state = initialsate, action) {
  switch (action.type) {
    case ON_AUTH_STATE_CHANGED:
      return {
        user: action.payload,
      };
    default:
      return state;
  }
}
