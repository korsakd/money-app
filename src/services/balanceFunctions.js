import {
  addBalance,
  removeBalance,
  replaceBalance,
} from '../redux/reducers/balanceReducer';
import {
  setUserBalanceData,
  removeUserBalanceData,
  replaceUserBalanceData,
} from '../services/firebase';

export const setBalanceDb = balance => {
  return (dispatch, getState) => {
    dispatch(addBalance(balance));
    const state = getState();
    const idBalance = balance.id;
    if (state.userReducer.user) {
      setUserBalanceData(state.userReducer.user, balance, idBalance);
    }
  };
};

export const removeBalanceDb = id => {
  return (dispatch, getState) => {
    dispatch(removeBalance(id));
    const state = getState();
    if (state.userReducer.user) {
      removeUserBalanceData(state.userReducer.user, id);
    }
  };
};

export const replaceBalanceDb = (element, index) => {
  return (dispatch, getState) => {
    dispatch(replaceBalance(element, index));
    const state = getState();
    if (state.userReducer.user) {
      replaceUserBalanceData(state.userReducer.user, element);
    }
  };
};
