import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import Income from './src/Components/IncomeCategory';
import Costs from './src/Components/CostsCategory';

const App = () => {
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

export default App;
