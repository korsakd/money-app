const initialState = {
  balance: [],
};

const ADD_BALANCE = 'ADD_BALANCE';
const REMOVE_BALANCE = 'REMOVE_BALANCE';
const REPLACE_BALANCE = 'REPLACE_BALANCE';

export const addBalance = balance => ({
  type: ADD_BALANCE,
  payload: balance,
});
export const removeBalance = index => ({
  type: REMOVE_BALANCE,
  payload: index,
});
export const replaceBalance = (element, index) => ({
  type: REPLACE_BALANCE,
  payload: {element, index},
});

export default function balanceReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_BALANCE:
      return {
        balance: [action.payload, ...state.balance],
      };
    case REMOVE_BALANCE:
      return {
        balance: state.balance.filter((element, i) => action.payload !== i),
      };
    case REPLACE_BALANCE:
      state.balance.splice(action.payload.index, 1, action.payload.element);
      return {
        balance: [...state.balance],
      };
    default:
      return state;
  }
}
