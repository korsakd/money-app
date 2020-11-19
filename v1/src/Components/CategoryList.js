import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';

import CategoryIcon from './CategoryComponent';

const CategoryList = ({categoryArray, setChooseIcon}) => {
  return (
    <View style={styles.iconWrap}>
      {categoryArray.map((element, index) => {
        return (
          <TouchableOpacity
            style={{
              flexGrow: 0,
              flexShrink: 0,
              flexBasis: '18%',
              marginHorizontal: '1%',
              marginVertical: '1%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            key={index}
            onPress={() => setChooseIcon(element)}>
            <CategoryIcon iconName={element} />
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  iconWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
});

export default CategoryList;
