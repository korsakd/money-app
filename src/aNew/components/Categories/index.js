import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { connect } from 'react-redux';

const CategoriesScreen = ({ income }) => {
  console.tron({ income });

  return (
    <View>
      <Text>1234</Text>
    </View>
  );
};

const mapStateToProps = state => ({
  income: state.categoriesReducer.income,
  costs: state.categoriesReducer.costs,
});

export default connect(
  mapStateToProps,
  null,
)(CategoriesScreen);
