import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import Income from '../Components/IncomeCategory';
import Costs from '../Components/CostsCategory';

const CategoriesTab = createMaterialTopTabNavigator();

const CategoriesNav = () => {
  return (
    <CategoriesTab.Navigator swipeEnabled>
      <CategoriesTab.Screen name="Доходы" component={Income} />
      <CategoriesTab.Screen name="Рассходы" component={Costs} />
    </CategoriesTab.Navigator>
  );
};

export default CategoriesNav;
