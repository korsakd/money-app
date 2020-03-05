import React, {useState, useContext, useEffect} from 'react';
import {StyleSheet, ScrollView, View, Text} from 'react-native';

import {CategoryContext} from '../navigation';
import AddCategory from './AddButtonComponent';
import IconItem from './IconItem';

const Profile = () => {
  const categoryContext = useContext(CategoryContext);
  const [incomeCategory, setIncomeCategory] = useState(
    categoryContext.incomeCategory,
  );
  useEffect(() => {
    setIncomeCategory(categoryContext.incomeCategory);
  }, [categoryContext]);
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

      <ScrollView horizontal contentContainerStyle={styles.wrap}>
        <IconItem categoryList={incomeCategory} />
        <AddCategory from="Profile" />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  wrap: {
    justifyContent: 'flex-start',
  },
});
export default Profile;
