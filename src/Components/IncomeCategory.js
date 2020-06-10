import React from 'react';
import {View, ScrollView} from 'react-native';
import DeletedCategory from './DeltedCategory';
import AddCategory from './AddButtonComponent';
import IconItem from './IconItem';
import {connect} from 'react-redux';
import {sortCategoryDb} from '../services/categoriesFunctions';

const Income = ({incomeCategory, sort, deletedCategory}) => {
  if (incomeCategory.length === 0) {
    return (
      <>
        <ScrollView>
          <DeletedCategory type={'Income'} />
        </ScrollView>
        <View>
          <AddCategory from="Income" />
        </View>
      </>
    );
  } else {
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
  }
};

const mapStateToProps = state => {
  return {
    incomeCategory: state.categoriesReducer.income,
    deletedCategory: state.categoriesReducer.deletedIncomeCategory,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    sort: categories => dispatch(sortCategoryDb(categories, 'Income')),
  };
};

// eslint-disable-next-line prettier/prettier
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Income);
