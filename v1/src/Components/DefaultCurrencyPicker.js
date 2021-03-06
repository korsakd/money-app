import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import translate from '../translate/Translate';

const DefaultCurrencyPicker = ({
  value,
  valueBLR,
  isReverse,
  defaultCurrency,
  exchangeRates,
  icons,
  removeModal,
  setIconSource,
  setCurAbbreviation,
  setValueBLR,
  setDefaultValueBLR,
  setForeignValue,
  setDefaultForeignValue,
}) => {
  const filteredCurrencyPicker = [];
  for (const item of defaultCurrency) {
    filteredCurrencyPicker.push(
      ...exchangeRates.filter(
        (element, index) => element.Cur_Abbreviation === item,
      ),
    );
  }
  return (
    <View style={{paddingVertical: 20}}>
      <View style={{alignItems: 'center'}}>
        <Text style={{marginBottom: 10}}>{translate('chooseCurrency')}</Text>
      </View>
      {filteredCurrencyPicker.map((element, index) => {
        return (
          <View key={index}>
            <TouchableOpacity
              onPress={() => {
                setIconSource(icons[element.Cur_Abbreviation]);
                setCurAbbreviation(element.Cur_Abbreviation);
                setValueBLR(
                  `${
                    isReverse
                      ? valueBLR
                      : (
                          value *
                          (element.Cur_OfficialRate / element.Cur_Scale)
                        ).toFixed(4)
                  }`,
                );
                setDefaultValueBLR(
                  `${(element.Cur_OfficialRate / element.Cur_Scale).toFixed(
                    4,
                  )}`,
                );
                setDefaultForeignValue(
                  `${(element.Cur_Scale / element.Cur_OfficialRate).toFixed(
                    4,
                  )}`,
                );
                setForeignValue(
                  `${
                    !isReverse
                      ? value
                      : (
                          valueBLR *
                          (element.Cur_Scale / element.Cur_OfficialRate)
                        ).toFixed(4)
                  }`,
                );
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
    defaultCurrency: state.currencyReducer.defaultCurrency,
    exchangeRates: state.currencyReducer.exchangeRates,
    icons: state.currencyReducer.icons,
  };
};

export default connect(
  mapStateToProps,
  null,
)(DefaultCurrencyPicker);
