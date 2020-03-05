import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';

const CategoryIcon = ({iconName, name}) => (
  <View style={styles.iconeContainer}>
    <View style={styles.iconStyle}>
      <Icon name={iconName} size={24} />
    </View>
    {name ? (
      <Text numberOfLines={1} ellipsizeMode={'tail'} style={styles.textItem}>
        {name}
      </Text>
    ) : null}
  </View>
);

const styles = StyleSheet.create({
  textItem: {
    textAlign: 'center',
  },
  iconeContainer: {
    marginHorizontal: 5,
    alignItems: 'center',
    width: 70,
  },
  iconStyle: {
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 50,
    width: 50,
    height: 50,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CategoryIcon;
