import React from 'react';
import { View } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../store';
import AddCategory from './AddCategory';
import CategoryList from './CategoryList';

type PropsFromRedux = ConnectedProps<typeof connector>;

const Income = ({ income }: PropsFromRedux) => {
  return (
    <View style={{ flex: 1 }}>
      <CategoryList categoryList={income} />
      <AddCategory from={'income'} />
    </View>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    income: state.category.income,
  };
};

const connector = connect(mapStateToProps, null);

export default connector(Income);
