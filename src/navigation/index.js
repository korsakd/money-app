import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import CategoriesNav from '../navigation/CatigoriesNavigation';
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
    <Stack.Navigator>
      <Stack.Screen
        name="Categories"
        component={CategoriesNav}
        options={{
          headerStyle: {
            backgroundColor: '#694fad',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <Stack.Screen
        name="NewCategory"
        component={NewCategory}
        options={{
          headerStyle: {
            backgroundColor: '#694fad',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
    </Stack.Navigator>
  );
}

export default Navigator;
