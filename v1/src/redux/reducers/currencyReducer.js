const initialState = {
  exchangeRates: [],
  filteredExchageRates: [],
  defaultCurrency: ['RUB', 'USD', 'UAH', 'EUR', 'PLN'],
  currencyPicker: ['AUD', 'BGN', 'JPY', 'CAD', 'CNY', 'KZT', 'TRY', 'GBP'],
  icons: {
    RUB: require('../../img/Russia.png'),
    USD: require('../../img/United-States.png'),
    UAH: require('../../img/Ukraine.png'),
    EUR: require('../../img/European-Union.png'),
    PLN: require('../../img/Poland.png'),
    AUD: require('../../img/Australia.png'),
    BGN: require('../../img/Bulgaria.png'),
    JPY: require('../../img/Japan.png'),
    CAD: require('../../img/Canada.png'),
    CNY: require('../../img/China.png'),
    KZT: require('../../img/Kazakhstan.png'),
    TRY: require('../../img/Turkey.png'),
    GBP: require('../../img/United-Kingdom.png'),
    BLR: require('../../img/Belarus.png'),
  },
  lastUpdatedDate: null,
};

const ADD_CURRENCY = 'ADD_CURRENCY';
const SET_DATE = 'SET_DATE';
const ADD_FILTERED_CURRENCY = 'ADD_FILTERED_CURRENCY';
const CLEAR_EXCHANGE_RATES = 'CLEAR_EXCHANGE_RATES';
const DELETE_EXCHANGE_RATES = 'DELETE_EXCHANGE_RATES';
const ADD_NEW_CURRENCY_FROM_PICKER = 'ADD_NEW_CURRENCY_FROM_PICKER';

export const addCurrency = currency => ({
  type: ADD_CURRENCY,
  payload: currency,
});
export const setDate = date => ({
  type: SET_DATE,
  payload: date,
});
export const addFilteredCurrency = curAbbreviation => ({
  type: ADD_FILTERED_CURRENCY,
  payload: curAbbreviation,
});
export const clearExchangeRates = () => ({
  type: CLEAR_EXCHANGE_RATES,
});
export const deleteExchangeRates = (index, curAbbreviation) => ({
  type: DELETE_EXCHANGE_RATES,
  payload: {index, curAbbreviation},
});
export const addNewCurrencyFromPicker = currency => ({
  type: ADD_NEW_CURRENCY_FROM_PICKER,
  payload: currency,
});

export default function currencyReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_CURRENCY:
      return {
        exchangeRates: [...action.payload],
        icons: state.icons,
        lastUpdatedDate: state.lastUpdatedDate,
        filteredExchageRates: state.filteredExchageRates,
        defaultCurrency: state.defaultCurrency,
        currencyPicker: state.currencyPicker,
      };
    case SET_DATE:
      return {
        lastUpdatedDate: action.payload,
        exchangeRates: [...state.exchangeRates],
        icons: state.icons,
        filteredExchageRates: state.filteredExchageRates,
        defaultCurrency: state.defaultCurrency,
        currencyPicker: state.currencyPicker,
      };
    case ADD_FILTERED_CURRENCY:
      return {
        filteredExchageRates: state.filteredExchageRates.concat(
          state.exchangeRates.filter(
            (element, index) => element.Cur_Abbreviation === action.payload,
          ),
        ),
        lastUpdatedDate: state.lastUpdatedDate,
        exchangeRates: [...state.exchangeRates],
        icons: state.icons,
        defaultCurrency: state.defaultCurrency,
        currencyPicker: state.currencyPicker,
      };
    case CLEAR_EXCHANGE_RATES:
      return {
        lastUpdatedDate: initialState.lastUpdatedDate,
        exchangeRates: initialState.exchangeRates,
        icons: state.icons,
        filteredExchageRates: initialState.filteredExchageRates,
        defaultCurrency: state.defaultCurrency,
        currencyPicker: state.currencyPicker,
      };
    case DELETE_EXCHANGE_RATES:
      return {
        filteredExchageRates: state.filteredExchageRates.filter(
          (element, index) => action.payload.index !== index,
        ),
        lastUpdatedDate: state.lastUpdatedDate,
        exchangeRates: [...state.exchangeRates],
        icons: state.icons,
        defaultCurrency: state.defaultCurrency.filter(
          (element, index) => element !== action.payload.curAbbreviation,
        ),
        currencyPicker: state.currencyPicker.concat(
          ...state.defaultCurrency.filter(
            (element, index) => action.payload.curAbbreviation === element,
          ),
        ),
      };
    case ADD_NEW_CURRENCY_FROM_PICKER:
      return {
        defaultCurrency: state.defaultCurrency.concat(
          ...state.currencyPicker.filter(
            (element, index) => element === action.payload.Cur_Abbreviation,
          ),
        ),
        currencyPicker: state.currencyPicker.filter(
          (element, index) => element !== action.payload.Cur_Abbreviation,
        ),
        icons: state.icons,
        lastUpdatedDate: state.lastUpdatedDate,
        exchangeRates: [...state.exchangeRates],
        filteredExchageRates: [...state.filteredExchageRates, action.payload],
      };
    default:
      return state;
  }
}
