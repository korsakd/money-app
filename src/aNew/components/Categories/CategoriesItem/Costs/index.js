import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import CategoryItem from '../CategoryItem';

const CostCategory = ({ costs }) => {
  return (
    <View style={{ flex: 1 }}>
      <CategoryItem categoryList={costs} type={'Costs'} />
    </View>
  );
};

const mapStateToProps = state => ({
  costs: state.categoriesReducer.costs,
});

export default connect(
  mapStateToProps,
  null,
)(CostCategory);
