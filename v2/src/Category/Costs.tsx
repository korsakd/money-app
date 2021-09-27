import React from 'react';
import { View } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../store';
import AddCategory from './AddCategory';
import CategoryList from './CategoryList';

type PropsFromRedux = ConnectedProps<typeof connector>;

const Costs = ({ costs }: PropsFromRedux) => {
  return (
    <View style={{ flex: 1 }}>
      <CategoryList categoryList={costs} />
    </View>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    costs: state.category.costs,
  };
};

const connector = connect(mapStateToProps, null);

export default connector(Costs);
