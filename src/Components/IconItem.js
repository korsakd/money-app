import React from 'react';
import {View} from 'react-native';

import CategoryIcon from './CategoryComponent';

const IconItem = ({categoryList}) => {
  return (
    <>
      {categoryList.map((element, index) => (
        <View key={index}>
          <CategoryIcon iconName={element.iconName} name={element.name} />
        </View>
      ))}
    </>
  );
};

export default IconItem;
