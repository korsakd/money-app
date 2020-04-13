import React from 'react';
import {View, StyleSheet} from 'react-native';

import AddCategory from './AddButtonComponent';
import IconItem from './IconItem';
import {connect} from 'react-redux';
import {sortCategories} from '../redux/reducers/categoriesReducer';
import {removeDeletedCategory} from '../redux/reducers/categoriesReducer';
import {addCategory} from '../redux/reducers/categoriesReducer';

const Income = ({incomeCategory, sort}) => {
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <IconItem
        categoryList={incomeCategory}
        applySort={data => sort(data)}
        type="Income"
      />
      <View>
        <AddCategory from="Income" />
      </View>
    </View>
  );
};

const mapStateToProps = state => {
  return {
    incomeCategory: state.categoriesReducer.income,
    deletedCategory: state.categoriesReducer.deletedIncomeCategory,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    sort: categories => dispatch(sortCategories(categories, 'Income')),
    removeDeleted: index => dispatch(removeDeletedCategory(index, 'Income')),
    add: category => dispatch(addCategory(category, 'Income')),
  };
};

// eslint-disable-next-line prettier/prettier
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Income);
