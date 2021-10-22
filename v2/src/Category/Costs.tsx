import React from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import CategoryList from './CategoryList';

const Costs = () => {
  const {
    category: { costs },
  } = useSelector((state: RootState) => state);
  return (
    <View style={{ flex: 1 }}>
      <CategoryList categoryList={costs} type={'costs'} />
    </View>
  );
};

export default Costs;
