import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import CurrencyСonversion from '../screens/CurrencyСonversion';
import ExchangeRates from '../screens/ExchangeRates';

const ConversionTab = createMaterialTopTabNavigator();

const ConversionNav = () => {
  return (
    <ConversionTab.Navigator swipeEnabled>
      <ConversionTab.Screen name="Курс валют" component={ExchangeRates} />
      <ConversionTab.Screen
        name="Конвертер валют"
        component={CurrencyСonversion}
      />
    </ConversionTab.Navigator>
  );
};

export default ConversionNav;
