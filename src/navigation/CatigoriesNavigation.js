import React from 'react';
import {View, Text} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import Income from '../Components/IncomeCategory';
import Costs from '../Components/CostsCategory';

const CategoriesTab = createMaterialTopTabNavigator();

const CategoriesNav = () => {
  return (
    <CategoriesTab.Navigator swipeEnabled>
      <CategoriesTab.Screen name="Income" component={Income} />
      <CategoriesTab.Screen name="Costs" component={Costs} />
    </CategoriesTab.Navigator>
  );
};

export default CategoriesNav;
