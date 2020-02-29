import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  ActivityIndicator,
  Button,
  TouchableOpacity,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import CategoryIcon from './CategoryComponent';
import AddCategory from './AddButtonComponent';

const Costs = () => {
  const [costsCategory, setCostsCategory] = useState([
    {iconName: 'home', name: 'Дом'},
    {iconName: 'car', name: 'Машина'},
    {iconName: 'airplane', name: 'Отдых'},
    {iconName: 'heart', name: 'Здоровье'},
  ]);
  return (
    <>
      <View>
        <Text
          style={{
            margin: 10,
            fontSize: 15,
          }}>
          Расходы
        </Text>
      </View>
      <ScrollView horizontal>
        {costsCategory.map((element, index) => (
          <View key={index}>
            <CategoryIcon iconName={element.iconName} name={element.name} />
          </View>
        ))}
        <AddCategory
          categoryArr={costsCategory}
          addCategory={setCostsCategory}
        />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  iconStyle: {
    borderColor: 'black',
    borderWidth: 4,
    borderRadius: 50,
    width: 80,
    height: 80,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Costs;
