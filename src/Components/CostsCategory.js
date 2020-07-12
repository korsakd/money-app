import React from 'react';
import {View, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import DeletedCategory from './DeltedCategory';
import AddCategory from './AddButtonComponent';
import IconItem from './IconItem';
import {sortCategoryDb} from '../services/categoriesFunctions';
import FocusAwareStatusBar from '../utils/StatusBarColor';

const Costs = ({costsCategory, sort}) => {
  if (costsCategory.length === 0) {
    return (
      <>
        <FocusAwareStatusBar backgroundColor="#fff" barStyle="dark-content" />
        <ScrollView>
          <DeletedCategory type={'Costs'} />
        </ScrollView>
        <View>
          <AddCategory from="Costs" />
        </View>
      </>
    );
  } else {
    return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <FocusAwareStatusBar backgroundColor="#fff" barStyle="dark-content" />
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
  }
};

const mapStateToProps = state => {
  return {
    costsCategory: state.categoriesReducer.costs,
    deletedCategory: state.categoriesReducer.deletedCostsCategory,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    sort: categories => dispatch(sortCategoryDb(categories, 'Costs')),
  };
};

// eslint-disable-next-line prettier/prettier
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Costs);
