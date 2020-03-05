import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import Profile from '../../Components/ProfileCategory';
import Costs from '../../Components/CostsCategory';

const Categories = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <Profile />
        <Costs />
      </SafeAreaView>
    </>
  );
};

export default Categories;
