import {
  addCurrency,
  addFilteredCurrency,
  setDate,
} from '../redux/reducers/currencyReducer';

export const addExchangeRates = (currency, date) => {
  return async (dispatch, getState) => {
    await dispatch(addCurrency(currency));
    dispatch(setDate(date));
    const state = getState();
    for (const item of state.currencyReducer.defaultCurrency) {
      dispatch(addFilteredCurrency(item));
    }
  };
};
