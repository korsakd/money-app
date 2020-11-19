import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import translate from '../translate/Translate';
import CurrencyСonversion from '../screens/CurrencyСonversion';
import ExchangeRates from '../screens/ExchangeRates';

const ConversionTab = createMaterialTopTabNavigator();

const ConversionNav = () => {
  return (
    <ConversionTab.Navigator swipeEnabled>
      <ConversionTab.Screen
        name="exchangeRates"
        options={{title: translate('exchangeRate')}}
        component={ExchangeRates}
      />
      <ConversionTab.Screen
        name="currencyConverter"
        options={{title: translate('сurrencyConverter')}}
        component={CurrencyСonversion}
      />
    </ConversionTab.Navigator>
  );
};

export default ConversionNav;
