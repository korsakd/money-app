import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {addNewCurrencyFromPicker} from '../redux/reducers/currencyReducer';

const CurrencyPicker = ({
  currencyPicker,
  exchangeRates,
  icons,
  addNewCurrency,
  removeModal,
}) => {
  const filteredCurrencyPicker = [];
  for (const item of currencyPicker) {
    filteredCurrencyPicker.push(
      ...exchangeRates.filter(
        (element, index) => element.Cur_Abbreviation === item,
      ),
    );
  }
  return (
    <View style={{paddingVertical: 20}}>
      <View style={{alignItems: 'center'}}>
        <Text style={{marginBottom: 10}}>Выберите валюту</Text>
      </View>
      {filteredCurrencyPicker.map((element, index) => {
        return (
          <View key={index}>
            <TouchableOpacity
              onPress={() => {
                addNewCurrency(element);
                removeModal(false);
              }}
              style={{
                flexDirection: 'row',
                marginBottom: 10,
                alignItems: 'center',
              }}>
              <Image
                style={{
                  width: 40,
                  height: 35,
                  marginLeft: 20,
                }}
                source={icons[element.Cur_Abbreviation]}
              />
              <Text style={{marginLeft: 20}}>{element.Cur_Name}</Text>
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
};

const mapStateToProps = state => {
  return {
    currencyPicker: state.currencyReducer.currencyPicker,
    exchangeRates: state.currencyReducer.exchangeRates,
    icons: state.currencyReducer.icons,
  };
};
const mapDispatchToProps = dispatch => ({
  addNewCurrency: currency => dispatch(addNewCurrencyFromPicker(currency)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CurrencyPicker);
