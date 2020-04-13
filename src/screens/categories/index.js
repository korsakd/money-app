import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import Income from '../../Components/IncomeCategory';
import Costs from '../../Components/CostsCategory';

const Categories = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <Income />
        <Costs />
      </SafeAreaView>
    </>
  );
};

export default Categories;
