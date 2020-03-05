import React, {useState, createContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Categories from '../screens/categories';
import NewCategory from '../screens/NewCategory';

const Stack = createStackNavigator();
export const CategoryContext = createContext();

function Navigator() {
  const [incomeCategory, setIncomeCategory] = useState([
    {iconName: 'credit-card', name: 'Кошелек'},
    {iconName: 'bank', name: 'Банковские вложения'},
  ]);
  const [costsCategory, setCostsCategory] = useState([
    {iconName: 'home', name: 'Дом'},
    {iconName: 'car', name: 'Машина'},
    {iconName: 'airplane', name: 'Отдых'},
    {iconName: 'heart', name: 'Здоровье'},
  ]);
  return (
    <CategoryContext.Provider
      value={{
        incomeCategory: incomeCategory,
        addCategory: cat => {
          setIncomeCategory([...incomeCategory, cat]);
        },
        costsCategory: costsCategory,
        addCostCategory: cat => {
          setCostsCategory([...costsCategory, cat]);
        },
      }}>
      <Stack.Navigator mode="modal">
        <Stack.Screen name="Categories" component={Categories} />
        <Stack.Screen name="NewCategory" component={NewCategory} />
      </Stack.Navigator>
    </CategoryContext.Provider>
  );
}

export default Navigator;
