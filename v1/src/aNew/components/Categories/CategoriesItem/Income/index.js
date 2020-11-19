import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import CategoryItem from '../CategoryItem';

const IncomeCategory = ({ incomes }) => {
  return (
    <View style={{ flex: 1 }}>
      <CategoryItem categoryList={incomes} type={'Costs'} />
    </View>
  );
};

const mapStateToProps = state => ({
  incomes: state.categoriesReducer.income,
});

export default connect(
  mapStateToProps,
  null,
)(IncomeCategory);
