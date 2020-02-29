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

const Profile = () => {
  const [incomeCategory, setIncomeCategory] = useState([
    {iconName: 'credit-card', name: 'Кошелек'},
    {iconName: 'bank', name: 'Банковские вложения'},
  ]);
  return (
    <>
      <View>
        <Text
          style={{
            margin: 10,
            fontSize: 15,
          }}>
          Доходы
        </Text>
      </View>
      <ScrollView horizontal>
        {incomeCategory.map((element, index) => (
          <View key={index}>
            <CategoryIcon iconName={element.iconName} name={element.name} />
          </View>
        ))}
        <AddCategory
          categoryArr={incomeCategory}
          addCategory={setIncomeCategory}
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

export default Profile;
