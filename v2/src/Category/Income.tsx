import React from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import CategoryList from './CategoryList';

const Income = () => {
  const {
    category: { income },
  } = useSelector((state: RootState) => state);
  return (
    <View style={{ flex: 1 }}>
      <CategoryList categoryList={income} type={'income'} />
    </View>
  );
};

export default Income;
