import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import translate from '../translate/Translate';
import Income from '../Components/IncomeCategory';
import Costs from '../Components/CostsCategory';

const CategoriesTab = createMaterialTopTabNavigator();

const CategoriesNav = () => {
  return (
    <CategoriesTab.Navigator swipeEnabled>
      <CategoriesTab.Screen
        name="Income"
        options={{
          title: translate('incomes'),
        }}
        component={Income}
      />
      <CategoriesTab.Screen
        name="Costs"
        options={{
          title: translate('costs'),
        }}
        component={Costs}
      />
    </CategoriesTab.Navigator>
  );
};

export default CategoriesNav;
