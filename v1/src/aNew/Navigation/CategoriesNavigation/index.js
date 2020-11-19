import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import IncomeCategory from '../../components/Categories/CategoriesItem/Income';
import CostCategory from '../../components/Categories/CategoriesItem/Costs';

const MainStack = createStackNavigator();

const CategoriesTab = createMaterialTopTabNavigator();

const CategoriesNav = () => {
  return (
    <CategoriesTab.Navigator swipeEnabled>
      <CategoriesTab.Screen
        name="Income"
        options={{
          title: 'Incomes',
        }}
        component={IncomeCategory}
      />
      <CategoriesTab.Screen
        name="Costs"
        options={{
          title: 'Costs',
        }}
        component={CostCategory}
      />
    </CategoriesTab.Navigator>
  );
};

const CategoriesScreenNavigator = () => {
  return (
    <MainStack.Navigator>
      <MainStack.Screen
        options={{
          headerShown: false,
        }}
        name="Categories"
        component={CategoriesNav}
      />
    </MainStack.Navigator>
  );
};

export default CategoriesScreenNavigator;
