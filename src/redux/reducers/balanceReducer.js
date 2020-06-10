const initialState = {
  balance: [],
};

const ADD_BALANCE = 'ADD_BALANCE';
const REMOVE_BALANCE = 'REMOVE_BALANCE';
const REPLACE_BALANCE = 'REPLACE_BALANCE';
const CLEAR_BALANCE = 'CLEAR-BALANSE';

export const addBalance = balance => ({
  type: ADD_BALANCE,
  payload: balance,
});
export const removeBalance = id => ({
  type: REMOVE_BALANCE,
  payload: id,
});
export const replaceBalance = (element, index) => ({
  type: REPLACE_BALANCE,
  payload: {element, index},
});

export const clearBalance = () => ({
  type: CLEAR_BALANCE,
});

export default function balanceReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_BALANCE:
      return {
        balance: [action.payload, ...state.balance],
      };
    case REMOVE_BALANCE:
      return {
        balance: state.balance.filter(
          (element, i) => action.payload !== element.id,
        ),
      };
    case REPLACE_BALANCE:
      const findedIndex = state.balance.findIndex(
        element => element.id === action.payload.element.id,
      );
      state.balance.splice(findedIndex, 1, action.payload.element);
      return {
        balance: [...state.balance],
      };
    case CLEAR_BALANCE:
      return {
        balance: initialState.balance,
      };
    default:
      return state;
  }
}
