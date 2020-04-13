import React from 'react';
import {View, StyleSheet} from 'react-native';
import {connect} from 'react-redux';

import AddCategory from './AddButtonComponent';
import IconItem from './IconItem';
import {sortCategories} from '../redux/reducers/categoriesReducer';
import {removeDeletedCategory} from '../redux/reducers/categoriesReducer';
import {addCategory} from '../redux/reducers/categoriesReducer';

const Costs = ({costsCategory, sort}) => {
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <IconItem
        categoryList={costsCategory}
        applySort={data => sort(data)}
        type="Costs"
      />
      <View>
        <AddCategory from="Costs" />
      </View>
    </View>
  );
};

const mapStateToProps = state => {
  return {
    costsCategory: state.categoriesReducer.costs,
    deletedCategory: state.categoriesReducer.deletedCostsCategory,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    sort: categories => dispatch(sortCategories(categories, 'Costs')),
    removeDeleted: index => dispatch(removeDeletedCategory(index, 'Costs')),
    add: category => dispatch(addCategory(category, 'Costs')),
  };
};

// eslint-disable-next-line prettier/prettier
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Costs);
